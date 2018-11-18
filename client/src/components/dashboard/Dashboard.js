/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _action from '../../actions'

/** COMPONENTS */
import ProjectList from './projectPanel/projectList/ProjectList'

/** MATERIAL UI */
import { style } from './Style'
import Grid from '@material-ui/core/Grid';
import Loader from "../ui/loader/Loader";

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
            <Grid container justify='center' alignItems='center' className={classes.layout}>
                { !this.props.isLoading ?
                    <Grid xs={10} item className={classes.subLayout}>
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
                    </Grid>
                    :
                    <Loader/>
                }

            </Grid>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errorMessage: state.dashboard.errorMsg,
    allProjects: state.dashboard.projects,
    teamProjects: [], // todo
    memberId: state.signin.member.memberId,
    teams: state.dashboard.teams,
    isLoading: state.dashboard.isLoading
})

const mapDispatchToProps = {
    loadProjects: _action.dashboardAction.getAllProjectsMember,
    hideErrorMessage: _action.dashboardAction.hideErrorMessage,
    loadTeams: _action.dashboardAction.getAllTeams
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Dashboard));