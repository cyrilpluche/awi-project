import React from 'react'
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { style } from './Style'
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People'
import GroupWork from '@material-ui/icons/SupervisedUserCircle'
import Divider from '@material-ui/core/Divider';
// todo import action


class TeamPanel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: true,
        };
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div" >Teams</ListSubheader>}
                >
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <PeopleIcon fontSize="large" className={classes.iconHover}/>
                        </ListItemIcon>
                        <ListItemText inset primary="My teams" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.props.teams.map((team, i) =>
                                    <ListItem button className={classes.nested} key={i}>
                                        <ListItemIcon>
                                            <GroupWork />
                                        </ListItemIcon>
                                        <ListItemText inset secondary={team.teamName} />
                                    </ListItem>
                                )
                            }
                        </List>
                    </Collapse>
                </List>
                <Divider/>
                <List component="nav">
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon fontSize="large" className={classes.iconHover}/>
                        </ListItemIcon>
                        <ListItemText primary="Add a new team" />
                    </ListItem>
                </List>
            </div>
        )
    }
}

TeamPanel.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(TeamPanel));