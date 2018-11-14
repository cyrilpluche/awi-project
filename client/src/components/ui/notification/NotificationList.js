import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Notification from "./Notification"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    menuItem: {},
    primary: {},
    icon: {},
    list: {
        width: 300,
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
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.list}>
                <List>
                    {this.props.notifications.map((notification, index) =>
                        this.props.unreadFilter ?
                            notification.mhaStatus === 0 ?
                                <ListItem key={index}>
                                    <Notification
                                        notification={notification}
                                        notifications={this.props.notifications}
                                        notificationsUnread={this.props.notificationsUnread}
                                    />
                                </ListItem>
                            : null
                        :
                            <ListItem key={index}>
                                <Notification
                                    notification={notification}
                                    notifications={this.props.notifications}
                                    notificationsUnread={this.props.notificationsUnread}
                                />
                            </ListItem>
                    )}
                </List>
            </div>
        );
    }
}

NotificationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationList);