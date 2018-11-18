import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import _action from '../../../../actions'
import _helper from '../../../../helpers'

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";

import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/es/Typography/Typography";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";
import GridList from "@material-ui/core/es/GridList/GridList";
import GridListTileBar from "@material-ui/core/es/GridListTileBar/GridListTileBar";
import TextField from "@material-ui/core/es/TextField/TextField";

class ProjectList extends React.Component {

    constructor (props) {
        super(props)
        this.createProject = this.createProject.bind(this)
        this.handleChangeProjectVisibility = this.handleChangeProjectVisibility.bind(this)
        this.setProjectFavorite = this.setProjectFavorite.bind(this)

        this.state = {
            projectTitle: '',
            projectVisibility: 1,
            isProjectPublic: false,
            openDialog: false
        }
    }

    /** Open and close the dialog */
    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };

    handleCloseDialog = () => {
        this.setState({
            openDialog: false,
            projectVisibility: 0});
    };

    /** Update and create the project */
    handleChangeProjectTitle = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeProjectVisibility = name => event => {
        // Private
        let projectVisibility = 1
        // Public
        if (event.target.checked) projectVisibility = 0
        this.setState({
            [name]: event.target.checked,
            projectVisibility: projectVisibility
        });
    };

    createProject () {
        let title = this.state.projectTitle
        let visibility = this.state.projectVisibility
        let status = 0; // Active and normal project
        let statusMemberProject = 1 // Current member is active on the project
        let targetDate = null
        let memberId = this.props.memberId

        this.props.createProjectMember(title, visibility, status, targetDate, memberId, statusMemberProject, this.props.member)
        this.handleCloseDialog()
    }

    /** Go the the clicked project */
    goToProject (event) {
        let projectId = event.currentTarget.id
        _helper.History.push('/project/' + projectId)
    }

    // TODO
    setProjectFavorite (event) {
        let index = event.currentTarget.id.split('/')[1]
        let projectIsFavorite = !this.props.projects[index].projectIsFavorite
        let projectId = this.props.projects[index].projectId
        let memberId = this.props.memberId
        this.props.updateProject(projectId, memberId, projectIsFavorite)
    }

    render() {
        const { classes } = this.props;

        /** NEW DIALOG */
        const createProjectDialog = (
            <Dialog
                open={this.state.openDialog}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <Grid container justify='center'>
                    <Typography variant='overline'>
                        Create a new project
                    </Typography>
                    <Grid xs={12} item>
                        <Divider/>
                    </Grid>
                </Grid>

                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="projectTitle"
                            label="Project title"
                            className={classes.textField}
                            value={this.state.projectTitle}
                            onChange={this.handleChangeProjectTitle('projectTitle')}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                        <Grid container alignItems='center' justify='space-around'>
                            <Typography variant='overline'>
                                Private
                            </Typography>
                            <Switch
                                checked={this.state.isProjectPublic}
                                defaultChecked
                                onChange={this.handleChangeProjectVisibility('isProjectPublic')}
                                value='isProjectPublic'
                                color="default"
                            />
                            <Typography variant='overline'>
                                Public
                            </Typography>
                        </Grid>
                    </form>

                    <Button
                        color="primary"
                        fullWidth
                        disabled={this.state.projectTitle.trim() === ''}
                        onClick={this.createProject}
                    >
                        Create
                    </Button>
                </DialogContent>
            </Dialog>
        )

        /** NEW PROJECT LIST */
        const projectList2 = (
            <GridList className={classes.gridList} cols={5}>
                {this.props.projects.map(project => {
                    if (this.props.isFavorite && project.projectIsFavorite) {
                        return (
                            <GridListTile
                                key={project.projectId}
                                className={ classes.borderRadius }
                            >
                                <Grid container
                                      onClick={this.goToProject}
                                      id={project.projectId}
                                      className={classes.imgInformationsFav + ' ' + classes.borderRadius + ' ' + classes.borderRadiusBottom }
                                >

                                </Grid>
                                <GridListTileBar
                                    title={project.projectTitle}
                                    subtitle={'Contributors : ' + project.contributor}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.gridTitle,
                                    }}
                                    className={ classes.borderRadiusBottom }
                                    actionIcon={
                                        <IconButton>
                                            <StarIcon
                                                className={ classes.favoriteButtonIcon }
                                                id={'project/' + this.props.projects.indexOf(project)}
                                                onClick={this.setProjectFavorite}
                                            />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        )
                    } else if (!this.props.isFavorite && !project.projectIsFavorite) {
                        return (
                            <GridListTile
                                key={project.projectId}
                                className={ classes.borderRadius }
                            >
                                <Grid container
                                      onClick={this.goToProject}
                                      id={project.projectId}
                                      className={classes.imgInformations + ' ' + classes.borderRadius + ' ' + classes.borderRadiusBottom }
                                >
                                </Grid>
                                <GridListTileBar
                                    title={project.projectTitle}
                                    subtitle={'Contributors : ' + project.contributor}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.gridTitle,
                                    }}
                                    className={ classes.borderRadiusBottom }
                                    actionIcon={
                                        <IconButton>
                                            <StarBorderIcon
                                                className={classes.addFavoriteButtonIcon}
                                                id={'project/' + this.props.projects.indexOf(project)}
                                                onClick={this.setProjectFavorite}
                                            />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        )
                    } else {
                        return null
                    }
                })}
            </GridList>
        )

        /** NEW BUTTON */
        let createProjectButton = ''
        if (this.props.canCreateProject){
            createProjectButton = (
                <Button color="primary" className={classes.button} onClick={this.handleClickOpenDialog}>
                    New
                    <AddIcon className={classes.rightIcon} />
                </Button>
            )
        }

        return (
            <Grid container className={ classes.projectLayout}>
                {createProjectDialog}
                <Grid container justify='space-between'>
                    <Typography variant="overline">
                        {this.props.title}
                    </Typography>
                    { !this.props.isFavorite ? createProjectButton : null}
                </Grid>
                <Grid xs={12} item>
                    <Divider/>
                </Grid>
                <Grid xs={12} item>
                    {projectList2}
                </Grid>
            </Grid>
        )
    }
}

ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    memberId: state.signin.member.memberId,
    member: state.signin.member
})

const mapDispatchToProps = {
    createProjectMember: _action.dashboardAction.createProject, // create un new project
    searchMember: _action.memberAction.searchMember,
    updateProject: _action.dashboardAction.updateMemberHasProject
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ProjectList));