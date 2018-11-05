import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Filter extends Component{
    render() {
        return (
            <List>
            {this.props.activities ?
                this.props.activities.map( (activity, index) =>
                    <ListItem key={index}>
                        <ListItemText primary={activity.actionTitle} secondary={activity.actionDescription} ></ListItemText>
                    </ListItem>
                 )
                :
                <ListItem key="0">
                    <ListItemText primary="0 activity founds"></ListItemText>
                </ListItem>
            }
            
        </List>
        )
    }
}




export default Filter;