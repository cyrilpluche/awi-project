import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: '100%',
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
        marginBottom: 12,
    },
};

class Notification extends React.Component {

    render() {
        const { classes } = this.props;
        const notification = this.props.notification

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {notification.actionTitle}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {notification.actionDescription}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Action</Button>
                </CardActions>
            </Card>
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notification);