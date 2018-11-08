import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { styles } from './Style'
import _action from "../../actions";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";

class LabelDialog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            card: this.props.card,
            selectedIndex: 1
        }
    }

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const { classes, onClose, selectedValue, isLoading, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
                <DialogTitle id="simple-dialog-title">Set labels</DialogTitle>
                <div className={classes.root}>
                    <List component="nav">
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 0}
                            onClick={event => this.handleListItemClick(event, 0)}
                        >
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 1}
                            onClick={event => this.handleListItemClick(event, 1)}
                        >
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 2}
                            onClick={event => this.handleListItemClick(event, 2)}
                        >
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 3}
                            onClick={event => this.handleListItemClick(event, 3)}
                        >
                            <ListItemText primary="Spam" />
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        );
    }
}

LabelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
};

const LabelDialogWrapped = withStyles(styles)(LabelDialog);


class Label extends React.Component {
    state = {
        open: false
    };

    componentDidMount (){
        this.props.onGetLabels()
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button
                    color="primary"
                    className={classes.button}
                    fullWidth
                    onClick={this.handleClickOpen}
                >
                    Label
                </Button>
                <LabelDialogWrapped
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

Label.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
    card: state.card.card
});
const mapDispatchToProps = {
    onGetLabels : _action.cardAction.getLabels
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Label));