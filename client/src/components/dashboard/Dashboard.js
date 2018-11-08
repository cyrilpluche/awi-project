/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _action from '../../actions'

/** COMPONENTS */
import ProjectList from './projectPanel/projectList/ProjectList'
import TeamPanel from './teamPanel/TeamPanel'

/** MATERIAL UI */
import { style } from './Style'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';

/** ICONS */
import ClearIon from '@material-ui/icons/Clear'
import IconButton from "@material-ui/core/IconButton";

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.onClick = this.onClick.bind(this);

        this.state = { // will be load at start
            teams: [
                {
                    teamName: 'Test'
                },
                {
                    teamName: 'Test2'
                }
            ] // todo change
        }
    }

    onClick () {
        // do something
    }

    componentWillMount () {
        this.props.loadProjects(this.props.memberId) // load all the project that the member is involved in
        this.props.loadTeams(this.props.memberId) // load all the member team

    }

    render() {
        const { classes } = this.props;

        let favoriteProjects = ''

        if (this.props.favoriteProjects.length > 0) {
            favoriteProjects = (
                <ProjectList title={'Favorite projects '} projects={this.props.favoriteProjects}/>
            )
        }

        let errorMsg = ''

        if (this.props.errorMessage !== undefined && this.props.errorMessage !== '') {
            errorMsg = (
                <Grid container style={{textAlign: 'center'}} alignItems='center' xs={12}>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <Zoom in={true}>
                            <Paper className={classes.errorMsg} elevation={1}>
                                <Typography variant="h5" component="h3" style={{color: '#990000'}}>
                                    <Grid container style={{textAlign: 'center'}} alignItems='center'>
                                        <Grid item xs={11}>
                                            Error
                                        </Grid>

                                        <Grid item xs={1} sm={1}>
                                            <IconButton onClick={this.props.hideErrorMessage}>
                                                <ClearIon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Typography component="p">
                                    {this.props.errorMessage}
                                </Typography>
                            </Paper>
                        </Zoom>

                    </Grid>
                </Grid>

            )
        }
        return (
            <Grid container className={classes.layout}>
                <Grid xs={5} item className={classes.subLayout}>
                    <Grid justify="center" container>
                        <TeamPanel teams={this.props.teams}/>
                    </Grid>
                </Grid>
                <Grid xs={7} item className={classes.subLayout}>
                    {favoriteProjects}

                    <ProjectList
                        title={"Personal projects"}
                        iconList={'work_outline'}
                        projects={this.props.allProjects}
                        canCreateProject
                    />

                    <ProjectList
                        title={"Team project"}
                        iconList={'people_outline'}
                        projects={this.props.teamProjects}
                        canCreateProject
                    />
                </Grid>
            </Grid>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    let list_favorite = []
    for (let i = 0; i < state.dashboard.projects.length; i++) {
        if (state.dashboard.projects[i].projectIsFavorite) list_favorite.push(state.dashboard.projects[i])
    } // only save the favorite projects of the member
    return {
        errorMessage: state.dashboard.errorMsg,
        allProjects: state.dashboard.projects,
        favoriteProjects: list_favorite,
        teamProjects: [], // todo
        memberId: state.signin.member.memberId,
        teams: state.dashboard.teams
    }
}

const mapDispatchToProps = {
    loadProjects: _action.dashboardAction.getAllProjectsMember,
    hideErrorMessage: _action.dashboardAction.hideErrorMessage,
    loadTeams: _action.dashboardAction.getAllTeams
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Dashboard));