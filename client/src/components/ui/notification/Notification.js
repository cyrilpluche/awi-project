import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import _action from "../../../actions";
import connect from "react-redux/es/connect/connect";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fade from "@material-ui/core/Fade/Fade";

const styles = {
    card: {
        width: '100%',
    },
    cardUnread: {
        width: '100%',
        backgroundColor: '#e7ecff'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        paddingBottom: 0,
    },
    content: {
        paddingTop: 10,
        paddingBottom: 0,
    }
};

class Notification extends React.Component {
    /*  Need to get a property notification which is an objects
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
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isRead: this.props.notification.mhaStatus === 1,
            updatedNotifications: []
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        var item = this.props.notification
        var index = this.props.notifications.indexOf(item)
        if (event.target.checked) {
            item.mhaStatus = 1
        }
        else item.mhaStatus = 0

        // Update the notification in the store
        this.props.onHandleCheckbox(this.props.notifications, item, index, event.target.checked, this.props.notificationsUnread)

        // Store the new item in navbar array, which will update the database
        // this.props.updateNotification(item)
    };

    computeBackground = () => {
        const { classes } = this.props;
        if (this.props.notification.mhaStatus === 1) return classes.card
        else return classes.cardUnread
    }

    render() {
        const { classes } = this.props;
        const notification = this.props.notification

        return (
            <Card className={this.computeBackground()}>
                <CardContent className={classes.content}>
                    <Typography align='right' variant="caption" className={classes.pos}>
                        {notification.Action.actionDateCreation}
                    </Typography>
                    <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="Mark as read"
                        placement="top-start">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.isRead}
                                    onChange={this.handleChange('isRead')}
                                    value="isRead"
                                    color="primary"
                                />
                            }
                            label={notification.Action.actionTitle}
                        />
                    </Tooltip>
                    <Typography className={classes.pos} variant="caption">
                        {notification.Action.actionDescription}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.navbar.notifications,
    notificationsUnread: state.navbar.notificationsUnread
})

const mapDispatchToProps = {
    onHandleCheckbox: _action.navbarAction.handleCheckboxNotification
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Notification));