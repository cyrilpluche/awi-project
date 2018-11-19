/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _helper from '../../helpers'
import _action from '../../actions'

/** MATERIAL UI */
import { style } from './Style'
import Grid from "@material-ui/core/Grid/Grid";
import LoaderPage from "../loaderPage/LoaderPage";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from '@material-ui/icons/Star'
import AddIcon from '@material-ui/icons/Add'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import TextField from "@material-ui/core/TextField/TextField";
import Switch from "@material-ui/core/Switch/Switch";
import Paper from "@material-ui/core/Paper/Paper";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

/** ICONS */
class DashboardFix extends React.Component {

    constructor (props) {
        super(props)
        this.createProject = this.createProject.bind(this)
        this.goToProject = this.goToProject.bind(this)
        this.handleProjectFavorite = this.handleProjectFavorite.bind(this)
        this.state = {
            open: false,
            projectTitle: '',
            isPublic: false
        };
    }

    componentWillMount () {
        const { onFindAllProjectsMember, memberId } = this.props;
        onFindAllProjectsMember(memberId)
    }

    /** Handle Dialog */
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    createProject () {
        const { onCreateProject, memberId, member } = this.props;
        let projectVisibility = 1
        if (this.state.isPublic) projectVisibility = 0
        let projectTitle = this.state.projectTitle

        onCreateProject(memberId, projectTitle, projectVisibility, member)
    }

    handleProjectFavorite (event) {
        const { onSetProjectAsFavorite, memberId, projects } = this.props;
        let index = event.currentTarget.id
        let project = projects[index].project
        let projectIsFavorite = !project.projectIsFavorite
        let projectId = project.projectId
        onSetProjectAsFavorite(memberId, projectId, projectIsFavorite, index)
    }

    goToProject (event) {
        let route = '/project/' + event.currentTarget.id
        _helper.History.push(route)
    }

    render() {
        const { classes, isLoading, projects } = this.props;

        /** Dialog */
        const createProjectDialog = (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
            >
                <Grid container justify='center' className={ classes.dialogCreation }>
                    <Typography variant='overline'>
                        Create Project
                    </Typography>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} className={ classes.textfield }>
                        <TextField
                            id="projectTitle"
                            label="Title"
                            fullWidth
                            className={classes.textField}
                            value={this.state.projectTitle}
                            onChange={this.handleChange('projectTitle')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid container justify='space-around' >
                        <Typography variant='overline' >
                            Private
                        </Typography>
                        <Switch
                            checked={this.state.isPublic}
                            onChange={this.handleChangeCheckbox('isPublic')}
                            value="isPublic"
                            color="default"
                        />
                        <Typography variant='overline'>
                            Public
                        </Typography>
                    </Grid>
                    <Grid container justify='center' >
                        <Button
                            color="primary"
                            className={classes.button}
                            onClick={this.createProject}
                            disabled={this.state.projectTitle.trim() === ''}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        )

        /** Personal project */
        const projectList = (
            <div className={ classes.maxWidth2 }>
                <div id='projectScroll' className={classes.projectArea}>
                    {projects.map((project, index) =>
                        !project.project.projectIsFavorite ? (
                            <Paper
                                key={project.project.projectId}
                                className={ classes.project }
                            >
                                <Grid container alignItems='center' style={{height: '100%', width: '272px'}}>
                                    <Grid container justify='space-between' alignItems='center'>
                                        <Typography variant='overline' className={ classes.whiteText }  >
                                            {project.project.Project.projectTitle}
                                        </Typography>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            id={project.project.projectId}
                                            className={classes.button + ' ' + classes.personalBtn}
                                            onClick={this.goToProject}
                                        >
                                            <FolderOpenIcon /> Open
                                        </Button>
                                    </Grid>
                                    <Grid container justify='space-between' alignItems='center'>
                                        <Typography variant='body2' className={ classes.whiteText } >
                                            {'Contributors : ' + project.contributors}
                                        </Typography>
                                        <IconButton
                                            id={index}
                                            onClick={this.handleProjectFavorite}
                                            className={classes.addFavoriteButtonIcon}
                                        >
                                            <StarBorderIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : null
                    )}
                </div>
            </div>
        )

        /** Favorite project */
        const favoriteList = (
            <div className={ classes.maxWidth2 }>
                <div id='projectScroll' className={classes.projectArea}>
                    {projects.map((project, index) =>
                        project.project.projectIsFavorite ? (
                            <Paper
                                key={project.project.projectId}
                                className={ classes.favorite }
                            >
                                <Grid container alignItems='center' style={{height: '100%', width: '272px'}}>
                                    <Grid container justify='space-between' alignItems='center'>
                                        <Typography variant='overline' className={ classes.whiteText }  >
                                            {project.project.Project.projectTitle}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            id={project.project.projectId}
                                            className={classes.button + ' ' + classes.favoriteBtn}
                                            onClick={this.goToProject}
                                        >
                                            <FolderOpenIcon /> Open
                                        </Button>
                                    </Grid>
                                    <Grid container justify='space-between' alignItems='center'>
                                        <Typography variant='body2' className={ classes.whiteText } >
                                            {'Contributors : ' + project.contributors}
                                        </Typography>
                                        <IconButton
                                            id={index}
                                            onClick={this.handleProjectFavorite}
                                            className={classes.addFavoriteButtonIcon}
                                        >
                                            <StarIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : null
                    )}
                </div>
            </div>
        )

        /** Button creation */
        const creationButton = (
            <Button
                color="primary"
                className={classes.button}
                onClick={this.handleClickOpen}
            >
                <AddIcon /> New
            </Button>
        )

        return (
            <Grid container justify="center">
                {isLoading ? (
                        <LoaderPage/>
                    ) :
                    <Grid container className={ classes.mainContainer + ' ' + classes.maxWidth }>
                        {createProjectDialog}
                        <Grid container>
                            <Typography variant='overline'>
                                FAVORITE PROJECTS
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                        {favoriteList}
                        <Grid container justify='space-between' className={ classes.marginTop }>
                            <Typography variant='overline'>
                                PERSONAL PROJECTS
                            </Typography>
                            {creationButton}
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                        {projectList}
                    </Grid>
                }
            </Grid>
        )
    }
}

DashboardFix.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.dashboardFix.isLoading,
    projects: state.dashboardFix.projects,
    memberId: state.signin.member.memberId,
    member: state.signin.member
})

const mapDispatchToProps = {
    onFindAllProjectsMember: _action.dashboardFixAction.findAllProjectsMember,
    onCreateProject: _action.dashboardFixAction.createProject,
    onSetProjectAsFavorite: _action.dashboardFixAction.setAsProjectFavorite
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(DashboardFix));