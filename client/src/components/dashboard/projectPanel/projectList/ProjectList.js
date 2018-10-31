import React from 'react'
import {connect} from "react-redux";
import _action from '../../../../actions/index'
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from "@material-ui/core/IconButton";
import AddFavoriteIcon from '@material-ui/icons/StarBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Star'
import AddProjectIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent';


class ProjectList extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        const { classes } = this.props;

        let projectsList = this.props.projects.map(
            project => {
                let icon = (
                    <IconButton aria-label="Add to favorites" className={classes.addFavoriteButtonIcon}>
                        <AddFavoriteIcon className={classes.Icon}/>
                    </IconButton>
                )
                if (project.favorite) { // the project is already favorite
                    icon =  (
                        <IconButton aria-label="remove to favorites" className={classes.favoriteButtonIcon}>
                            <FavoriteIcon className={classes.Icon}/>
                        </IconButton>
                    )
                }

                let card = (
                    <Card className={classes.default_card}>
                        <CardActionArea>
                            <CardMedia  height="140">
                                <h2 style={{color: 'white', top: 0, left: 0, display: 'flex', paddingLeft: '3%'}}>
                                    {project.name}
                                    </h2>
                                {icon}
                            </CardMedia>
                        </CardActionArea>
                    </Card>
                );

                return <Grid item sm={3} xs={12} spacing={24}>
                    {card}
                </Grid>

            }
        )

        let createProjectComponent = ''

        if (this.props.canCreateProject) { // this means that we can create a new project starting form this list
            createProjectComponent = (
                <Grid item sm={3} xs={12} spacing={24}>
                    <Card className={classes.add_project_card}>
                        <CardActionArea  height="140">
                            <h2>Add new project</h2>
                            <IconButton>
                                <AddProjectIcon className={classes.Icon}/>
                            </IconButton>

                        </CardActionArea>
                    </Card>
                </Grid>
            )
        }

        return (
            <Grid container alignItems='flex-start' className={classes.root}>
                <Grid item xs={12}>
                    <h3 className={classes.title}>{this.props.title}</h3>
                </Grid>
                <Grid item container xs={12}>{createProjectComponent} {projectsList} </Grid>
            </Grid>
        )
    }
}

ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ProjectList));