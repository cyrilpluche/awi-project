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
import Grid from '@material-ui/core/Grid';

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

        return (
            <Grid container className={classes.layout}>
                <Grid xs={5} item className={classes.subLayout}>
                    <Grid justify="center" container>
                        <TeamPanel teams={this.props.teams}/>
                    </Grid>
                </Grid>
                <Grid xs={7} item className={classes.subLayout}>
                    <ProjectList
                        title={"Favorite projects"}
                        iconList={'work_outline'}
                        projects={this.props.allProjects}
                        canCreateProject
                        isFavorite={true}
                    />

                    <ProjectList
                        title={"Personal projects"}
                        iconList={'work_outline'}
                        projects={this.props.allProjects}
                        canCreateProject
                        isFavorite={false}
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