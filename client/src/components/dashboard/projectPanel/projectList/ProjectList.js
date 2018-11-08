import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import _action from '../../../../actions'
import Helper from '../../../../helpers'
import Background from '../../../../public/images/project-bg.jpg'

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
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/es/Typography/Typography";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";
import GridList from "@material-ui/core/es/GridList/GridList";
import GridListTileBar from "@material-ui/core/es/GridListTileBar/GridListTileBar";
import TextField from "@material-ui/core/es/TextField/TextField";

class ProjectList extends React.Component {

    constructor (props) {
        super(props)
        this.createProject = this.createProject.bind(this)
        this.handleChangeProjectVisibility = this.handleChangeProjectVisibility.bind(this)
        this.setProjectHasFavorite = this.setProjectHasFavorite.bind(this)

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
        console.log(name)
        console.log(event.target.checked)
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

        this.props.createProjectMember(title, visibility, status, targetDate, memberId, statusMemberProject)
        this.handleCloseDialog()
    }

    // TODO
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
            <GridList className={classes.gridList} cols={2.5}>
                {this.props.projects.map(project => (
                    <GridListTile key={project.projectId}>
                        <img src={Background} alt='prello logo' />
                        <GridListTileBar
                            title={project.projectTitle}
                            classes={{
                                root: classes.titleBar,
                                title: classes.gridTitle,
                            }}
                            actionIcon={
                                <IconButton>
                                    <FavoriteIcon className={classes.gridTitle} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        )

        /** NEW BUTTON */
        const createProjectButton = (
            <Button color="primary" className={classes.button} onClick={this.handleClickOpenDialog}>
                New
                <AddIcon className={classes.rightIcon} />
            </Button>
        )

        return (
            <Grid container className={ classes.projectLayout}>
                {createProjectDialog}
                <Grid container justify='space-between'>
                    <Typography variant="overline">
                        {this.props.title}
                    </Typography>
                    {createProjectButton}
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
    memberId: state.signin.member.memberId
})

const mapDispatchToProps = {
    createProjectMember: _action.dashboardAction.createProject, // create un new project
    searchMember: _action.memberAction.searchMember,
    updateProject: _action.dashboardAction.updateMemberHasProject
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ProjectList));