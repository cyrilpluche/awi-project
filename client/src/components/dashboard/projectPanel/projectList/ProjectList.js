import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from "@material-ui/core/IconButton";
import AddFavoriteIcon from '@material-ui/icons/StarBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Star'
import AddProjectIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon';

class ProjectList extends React.Component {
    render() {
        const { classes } = this.props;

        let projectsList = this.props.projects.map(
            (project, key) => {
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
                            <h2 style={{color: 'white', top: 0, left: 0, display: 'flex', paddingLeft: '3%'}}>
                                {project.name}
                            </h2>
                            {icon}
                        </CardActionArea>
                    </Card>
                );
                if (this.props.backgroundimage !== undefined && this.props.backgroundimage !=='') {
                    // if the projects has a background image
                    card = (
                        <Card className={classes.default_card}>
                            <CardActionArea>
                                <CardMedia  height="120" src={this.props.backgroundimage}>
                                    <h2 style={{color: 'white', top: 0, left: 0, display: 'flex', paddingLeft: '2%'}}>
                                        {project.name}
                                    </h2>
                                    {icon}
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    );

                }

                return <Grid item sm={3} xs={12} key={key} >
                    {card}
                </Grid>

            }
        )

        let createProjectComponent = ''

        if (this.props.canCreateProject) { // this means that we can create a new project starting form this list
            createProjectComponent = (
                <Grid item sm={3} xs={12}>
                    <Card className={classes.add_project_card}>
                        <CardActionArea  height="140">
                            <h3 style={{color: '#999999'}}>Add new project</h3>
                            <IconButton>
                                <AddProjectIcon className={classes.addIcon}/>
                            </IconButton>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        }

        let iconList = 'star_border' // icon displayed before the list name
        if (this.props.iconList !== undefined && this.props.iconList !== '') iconList = this.props.iconList

        return (
            <Grid container alignItems='flex-start' className={classes.root}>
                <Grid item container xs={12} alignItems='center'>
                    <Grid item xs={1}>
                        <Icon style={{fontSize: '22px'}}>{iconList}</Icon>
                    </Grid>
                    <Grid item xs={11}>
                        <h3 className={classes.title}>{this.props.title}</h3>
                    </Grid>
                </Grid>
                <Grid item container xs={12} alignItems='center'>{createProjectComponent} {projectsList} </Grid>
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