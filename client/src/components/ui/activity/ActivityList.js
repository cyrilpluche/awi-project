import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";

class ActivityList extends Component{
    render() {
        return (
            <List>
            {this.props.activities.length > 0 ?
                this.props.activities.map( (activity, index) =>
                    <ListItem key={index}>
                        <Grid justify="space-between" container>
                            <Typography variant='h6'>
                                {activity.actionTitle}
                            </Typography>
                            <Typography variant='caption'>
                                {activity.actionDateCreation}
                            </Typography>
                            <Grid xs={12} item>
                                <Typography variant='body2'>
                                    {activity.actionDescription}
                                </Typography>
                                <Divider/>
                            </Grid>
                        </Grid>
                    </ListItem>
                 )
                :
                <ListItem key="0">
                    <ListItemText primary="0 activity founds"/>
                </ListItem>
            }
            
        </List>
        )
    }
}
export default ActivityList;