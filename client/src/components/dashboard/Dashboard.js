import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import PropTypes from 'prop-types';
import ProjectList from './projectPanel/projectList/ProjectList'
import TeamPanel from './teamPanel/TeamPanel'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { style } from './Style'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)

        this.onClick = this.onClick.bind(this);

        this.state = { // will be load at start
            favoriteProjects: [],
            temaProjects: [],
            allProjects: [],
            teams: [
                {
                    teamName: 'Test'
                },
                {
                    teamName: 'Test2'
                }
            ]
        }
    }

    onClick () {
        // do something
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}  direction="row"  justify="center" alignItems="center">
                    <Grid item xs={3} container>
                        <TeamPanel teams={this.state.teams}/>
                    </Grid>
                    <Grid item xs={9} container justify="center"
                          alignItems="center"> {/* Project List Container */}
                        <Grid item xs={12}>
                            <ProjectList title={"Projets equipe"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectList title={'Projets favoris '}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectList title={"Tous les projets"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>



            /* <div onClick={this.onClick}>
                <p>Hello</p>
                <p>{this.props.project.projectTitle}</p>
            </div> */
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    project: state.dashboard.project
})

const mapDispatchToProps = {
    onClick: _action.dashboardAction.fetchProject
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Dashboard));