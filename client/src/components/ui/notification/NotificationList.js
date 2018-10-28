import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Notification from "./Notification"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";

const styles = theme => ({
    menuItem: {},
    primary: {},
    icon: {},
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
});

class NotificationList extends React.Component {
    /*  Need to get a property notifications which is an array of objects
     *  object = {
     *      actionId: Int,
     *      actionType: Int,
     *      actionTitle: String,
     *      actionDescription: String,
     *      memberId: Int
     *  }
     */

    notificationItem = (n) => (
        <Notification notification={n} />
    );

    /* Build the notification list of the menu */
    buildNotifications = () => {
        let list = []
        const {classes} = this.props;

        if (this.props.notifications.length > 0) {
            for (let item of this.props.notifications) {
                list.push(
                    <ListItem key={this.props.notifications.indexOf(item)}>
                        {this.notificationItem(item)}
                    </ListItem>
                )
            }
        } else {
            list.push(
                <ListItem key='0'>
                        <ListItemText primary="No notifications"/>
                </ListItem>
            )
        }

        return list
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.list}>
                <List>
                    {this.buildNotifications()}
                </List>
            </div>
        );
    }
}

NotificationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationList);