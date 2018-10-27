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
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField/TextField";


class Cardboard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            open: false,
        };
    }

    getModalStyle = () =>{
        return {
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`
        };
    };

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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="h5" id="modal-title">
                        Clean the github
                    </Typography>
                    <div>
                        <h4>Members</h4>
                        <div className={classes.row}>
                            <Avatar className={classes.marginCard}>H</Avatar>
                            <Button variant="fab" aria-label="Add" className={classes.sizeButtonModal}><AddIcon/></Button>
                        </div>
                    </div>
                    <div>
                        <h4>Labels</h4>
                    </div>
                    <div>
                        <h4>Description</h4>
                        <TextField
                            placeholder="Add your description here ..."
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                        />
                    </div>
                    <div>
                        <h4>Add comment</h4>
                        <TextField
                            placeholder="Add your comment here ..."
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                        />
                    </div>
                </div>
            </Modal>
                <Card className={classes.card} >
                    <CardActionArea onClick={this.handleOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Clean the github
                            </Typography>
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
