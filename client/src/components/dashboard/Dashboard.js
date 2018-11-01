import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import PropTypes from 'prop-types';
import ProjectList from './projectPanel/projectList/ProjectList'
import TeamPanel from './teamPanel/TeamPanel'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { style } from './Style'
import List from "../list/List";

class Dashboard extends React.Component {
    constructor (props) {
        super(props)

        this.onClick = this.onClick.bind(this);

        this.state = { // will be load at start
            favoriteProjects: [
                {
                    name: 'Project 1',
                    favorite: true
                },
            ],
            teamProjects: [
                {
                    name: 'Project 1',
                    favorite: true
                },
                {
                    name: 'Project 2',
                    favorite: false
                }
            ],
            allProjects: [
                {
                    name: 'Project 1',
                    favorite: true
                },
                {
                    name: 'Project 2',
                    favorite: false
                }
            ],
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
            <Grid container alignItems='flex-start' className={classes.layout}>
                <Grid item xs={2} className={classes.leftLayout}/>
                <Grid item container spacing={24} xs={9} direction="row"
                      justify="center" alignItems="flex-start">
                    <Grid item xs={4} container>
                        <TeamPanel teams={this.state.teams}/>
                    </Grid>
                    <Grid item xs={8} container justify="center"
                          alignItems="center"> {/* Project List Container */}
                        <Grid item xs={12}>
                            <ProjectList title={"Team project"} iconList={'people_outline'}
                                         projects={this.state.teamProjects} canCreateProject/>
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectList title={'Favorite projects '} projects={this.state.favoriteProjects}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectList title={"Personal projects"} iconList={'work_outline'}
                                         projects={this.state.allProjects} canCreateProject/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>



            /* <div onClick={this.onClick}>
                <p>Hello</p>
                <p>{this.props.project.projectTitle}</p>
            </div> */
                <List content = {{id:1}}/>
            </div>
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