import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import PropTypes from 'prop-types';
import ProjectList from './projectPanel/projectList/ProjectList'
import TeamPanel from './teamPanel/TeamPanel'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { style } from './Style'
import logo from '../../public/images/prello-logo-2.png'

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

    componentWillMount () {
        this.props.loadProjects(5) // TODO replace 5 by the user id
        // console.log('Props', this.props)
        /*let list_favorite = [] // tODO
        for (let i = 0; i < this.props.projects.length; i++) {
            if (this.props.projects[i].project_is_favorite) list_favorite.push(this.props.projects[i])
        } // only save the favorite projects of the member
        this.setState({ favoriteProjects: list_favorite, allProjects: this.props.projects });

        console.log(this.state) */
    }

    render() {
        const { classes } = this.props;

        let favoriteProjects = ''

        if (this.props.favoriteProjects.length > 0) {
            favoriteProjects = (
                <Grid item xs={12}>
                    <ProjectList title={'Favorite projects '} projects={this.props.favoriteProjects}/>
                </Grid>
            )
        }
        return (
            <Grid container alignItems='flex-start' className={classes.layout}>
                <Grid item xs={1} sm={2} className={classes.leftLayout}/>
                <Grid item container spacing={24} xs={11} sm={10} direction="row"
                      justify="center" alignItems="flex-start" style={{textAlign: 'center'}}>
                    <Grid item xs={12}>
                        <img src={logo} width="100" alt="prello logo"/>
                    </Grid>
                    <Grid item xs={8} sm={4} container justify="center" style={{textAlign: 'center'}}
                          alignItems="center">
                        <Grid item xs={12}>
                            <TeamPanel teams={this.state.teams}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} container justify="center"
                          alignItems="center"> {/* Project List Container */}
                        {favoriteProjects}
                        <Grid item xs={12}>
                            <ProjectList title={"Team project"} iconList={'people_outline'}
                                         projects={this.props.teamProjects} canCreateProject/>
                        </Grid>
                        <Grid item xs={12}>
                            <ProjectList title={"Personal projects"} iconList={'work_outline'}
                                         projects={this.props.allProjects} canCreateProject/>
                        </Grid>
                    </Grid>
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
        if (state.dashboard.projects.project_is_favorite) list_favorite.push(state.dashboard.projects[i])
    } // only save the favorite projects of the member
    return {
        allProjects: state.dashboard.projects,
        favoriteProjects: list_favorite,
        teamProjects: [] // todo
    }
}

const mapDispatchToProps = {
    loadProjects: _action.dashboardAction.getAllProjectsMember
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Dashboard));