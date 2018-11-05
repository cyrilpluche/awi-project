import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import _action from '../../../../actions'
import Helper from '../../../../helpers'

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from "@material-ui/core/IconButton";
import AddFavoriteIcon from '@material-ui/icons/StarBorderOutlined'
import ClearIon from '@material-ui/icons/Clear'
import FavoriteIcon from '@material-ui/icons/Star'
import AddProjectIcon from '@material-ui/icons/Add'
import LockerIcon from '@material-ui/icons/Lock'
import ProjectIcon from '@material-ui/icons/SchoolRounded'
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class ProjectList extends React.Component {

    constructor (props) {
        super(props)

        this.setProjectHasFavorite = this.setProjectHasFavorite.bind(this)
        this.goTo = this.goTo.bind(this)
        this.createProject = this.createProject.bind(this)
        this.state = {
            dialogDisplayed: false,
            buttonCreateProjectDisabled: true,
            newProjectisPublic: true // project visibility
        }
    }

    handleClickOpenDialog = () => {
        this.setState({ dialogDisplayed: true });
    };

    handleCloseDialog = () => {
        this.setState({
            dialogDisplayed: false,
            buttonCreateProjectDisabled: true,
            newProjectisPublic: true});
        // close the dialog and disable the button
    };

    handleChangeProjectTitle = (event) => { // when the title of the project change
        let e = event.target.value
        //document.querySelector('#projectTitle').value
        if (e === undefined ||e === '')
            this.setState({buttonCreateProjectDisabled: true });
        else {
            this.setState({buttonCreateProjectDisabled: false });
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    projectVisiblity = () =>  {
        if (this.state.newProjectisPublic) return 'Public'
        else return 'Private'
    }

    // get the locker associated to the visibility
    locker = () => {
        if (this.state.newProjectisPublic) return (<LockerIcon style={{fontSize: '32px', color: '#d9d9d9'}}/>)
        else return (<LockerIcon style={{fontSize: '32px', color: '#ff8566'}}/>)
    }

    setProjectHasFavorite (projectId) {
        let projectFound = false
        let favoriteSate = true // will be sent to server to update the projects
        for (let i = 0; i < this.props.projects.length && !projectFound ; i++) {
            if (this.props.projects[i].projectId === projectId) {
                favoriteSate =  !this.props.projects[i].projectIsFavorite
                projectFound = true
            }
        }

        this.props.updateProject(projectId, this.props.memberId, favoriteSate, null)
    }

    goTo (projectId) {
        Helper.History.push(`/project/${projectId}`)
    }

    createProject () {
        let title = document.querySelector('#projectTitle').value;
        let visibility = 0
        if (this.state.newProjectisPublic) visibility = 1

        let status = 0
        let targetDate = new Date(document.querySelector('#projectTargetDate').value)

        this.props.createProjectMember(title, visibility, status, targetDate,this.props.memberId, 0)

        this.handleCloseDialog()
    }

    render() {
        const { classes } = this.props;

        let dialog = (
            <Dialog
                open={this.state.dialogDisplayed}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Grid container style={{textAlign: 'center'}} alignItems='center'>
                        <Grid item xs={2} sm={2}>
                            <ProjectIcon style={{fontSize: '32px', color :'#d6d6c2'}}/>
                        </Grid>
                        <Grid item xs={9} sm={8}>
                            <span style={{marginLeft: '5%'}}>Create a new project</span>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <IconButton onClick={this.handleCloseDialog}>
                                <ClearIon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="teamName-input" required>
                                <span style={{fontSize: '15px'}}>Title</span>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <InputBase
                                id="projectTitle"
                                style={{marginBottom: '2%', marginTop: '1%'}}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                                placeholder="title"
                                fullWidth required autoFocus
                                onChange={this.handleChangeProjectTitle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="teamDescription-input">
                                <span style={{fontSize: '15px'}}>Visibility</span>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} container style={{textAlign: 'center'}} alignItems='center'>
                            <Grid item xs={2}>
                                {this.locker()}
                            </Grid>
                            <Grid item xs={8}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.newProjectisPublic}
                                            onChange={this.handleChange('newProjectisPublic')}
                                            value="newProjectVisibility"
                                            color="primary"
                                        />
                                    }
                                    label={this.projectVisiblity()}
                                />

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="teamName-input">
                                <span style={{fontSize: '15px'}}>Target Date</span>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <InputBase
                                id="projectTargetDate"
                                style={{marginBottom: '2%', marginTop: '1%'}}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                                placeholder="title"
                                defaultValue={new Date() /* TODO format tade*/}
                                type="date"
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={3}/>
                        <Grid item xs={6}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button color="primary" fullWidth variant="outlined"
                                disabled={this.state.buttonCreateProjectDisabled}
                                onClick={this.createProject}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )

        let projectsList = ''

        if (this.props.projects !== undefined) {
            projectsList = this.props.projects.map(
                (project, key) => {
                    let icon = (
                        <IconButton aria-label="Add to favorites" className={classes.addFavoriteButtonIcon}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        this.setProjectHasFavorite(project.projectId)
                                    }}>
                            <AddFavoriteIcon className={classes.Icon}/>
                        </IconButton>
                    )
                    if (project.projectIsFavorite) { // the project is already favorite
                        icon =  (
                            <IconButton aria-label="remove to favorites" className={classes.favoriteButtonIcon}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            this.setProjectHasFavorite(project.projectId)
                                        }}>
                                <FavoriteIcon className={classes.Icon}/>
                            </IconButton>
                        )
                    }


                    let card = (
                        <Card className={classes.default_card} raised>
                            <CardActionArea  onClick={(e) => {

                                this.goTo(project.projectId)
                            }}>
                                <h2 style={{color: 'white', top: 0, left: 0, display: 'flex', paddingLeft: '3%'}}>
                                    {project.projectTitle}
                                </h2>
                                {icon}
                            </CardActionArea>
                        </Card>
                    );
                    if (this.props.backgroundimage !== undefined && this.props.backgroundimage !=='') {
                        // if the projects has a background image
                        card = (
                            <Card className={classes.default_card} raised>
                                <CardActionArea onClick={(e) => {
                                    this.goTo(project.projectId)
                                }}>
                                    <CardMedia  height="120" src={this.props.backgroundimage}>
                                        <h2 style={{color: 'white', top: 0, left: 0, display: 'flex', paddingLeft: '2%'}}>
                                            {project.projectTitle}
                                        </h2>
                                        {icon}
                                    </CardMedia>
                                </CardActionArea>
                            </Card>
                        );

                    }

                    return <Grid item sm={3} xs={12} key={key} >
                        {card}
                    </Grid>

                }
            )
        }


        let createProjectComponent = ''

        if (this.props.canCreateProject) { // this means that we can create a new project starting form this list
            createProjectComponent = (
                <Grid item sm={3} xs={12}>
                    <Card className={classes.add_project_card}>
                        <CardActionArea  height="140" onClick={this.handleClickOpenDialog}>
                            <h3 style={{color: '#999999'}}>Add new project</h3>
                            <AddProjectIcon className={classes.addIcon}/>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        }

        let iconList = 'star_border' // icon displayed before the list name
        if (this.props.iconList !== undefined && this.props.iconList !== '') iconList = this.props.iconList



        return (
            <Grid container alignItems='flex-start' className={classes.root}>
                {dialog}
                <Grid item container xs={12} alignItems='center'>
                    <Grid item xs={2}>
                        <Icon style={{fontSize: '22px'}}>{iconList}</Icon>
                    </Grid>
                    <Grid item xs={10}>
                        <h3 className={classes.title}>{this.props.title}</h3>
                    </Grid>
                </Grid>
                <Grid item container xs={12} alignItems='center'>{createProjectComponent} {projectsList} </Grid>
            </Grid>
        )
    }
}

ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    memberId: state.signin.member.memberId
})

const mapDispatchToProps = {
    createProjectMember: _action.dashboardAction.createProject, // create un new project
    searchMember: _action.memberAction.searchMember,
    updateProject: _action.dashboardAction.updateMemberHasProject
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ProjectList));