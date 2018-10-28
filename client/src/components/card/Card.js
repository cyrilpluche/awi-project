import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styles } from './Style'
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Modal from '@material-ui/core/Modal';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import { Scrollbars } from 'react-custom-scrollbars';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";


class Cardboard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Scrollbars style={
                        {
                            width: `54.5%`,
                            height: `65%`,
                            top: `50%`,
                            left: `50%`,
                            transform: `translate(-50%, -50%)`
                        }
                    }>
                    <div className={classes.paper}>
                        <div className={classes.column} style={{ borderRight: '0.1em solid grey'}}>
                            <Typography variant="h5" id="modal-title">
                                Clean the github
                            </Typography>
                            <div className={classes.row}>
                                <h4 >Members : </h4>
                                    <Avatar className={classes.marginCard}>H</Avatar>
                                </div>
                            <div className={classes.row}>
                                <h4>Labels : </h4>
                            </div>
                            <div>
                                <h4>Description</h4>
                                <Typography component="p">
                                    Add your description ...
                                </Typography>
                            </div>
                            <div>
                                <h4>Comment</h4>
                                <Typography component="p">
                                    Add your comment ...
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" className={classes.button}>Members</Button>
                            <Button variant="contained" className={classes.button}>Labels</Button>
                            <Button variant="contained" className={classes.button}>Checklist</Button>
                            <Button variant="contained" className={classes.button}>Description</Button>
                            <Button variant="contained" className={classes.button}>Comment</Button>
                            <Button variant="contained" className={classes.button}>Attachment</Button>
                            <Button variant="contained" className={classes.button}>Copy</Button>
                            <Button variant="contained" className={classes.button}>Archive</Button>
                            <Button variant="contained" className={classes.button}>Delete</Button>
                        </div>
                    </div>
                    </Scrollbars>
            </Modal>
                <Card className={classes.card} >
                    <CardActionArea onClick={this.handleOpen}>
                        <CardHeader
                            title="Clean the github"
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            <Typography component="p">
                                By merging all branches update the master branch
                            </Typography>
                            <div className={classes.rowRight}><Avatar className={classes.marginCard}>H</Avatar></div>
                            <Button variant="outlined" color="secondary" className={classes.marginCard}>10/01</Button>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

Cardboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(Cardboard);
