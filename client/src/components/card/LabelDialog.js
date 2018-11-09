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
import List from "@material-ui/core/List/List";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";


class LabelDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            card: this.props.card,
            selectedIndex: 1,
        }
    }

    handleChangeCheckbox = name => event => {
        //let index = event.target.id.split('/')[1]
        //let checked = event.target.checked
        this.setState({ maj: true });
    };

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const { classes, onClose, selectedValue, onDeleteLabel, onCreateLabel, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
                <DialogTitle id="simple-dialog-title">Set labels</DialogTitle>
                <div className={classes.root}>
                    <List component="nav">
                        { this.props.labels == null ? (
                                null
                            ) :  this.props.labels ? this.props.labels.map((label,index) => {
                            return (
                                <div key={label.labelId}>
                                    <ListItem
                                        style={{backgroundColor: label.labelColor}}
                                        selected={this.state.selectedIndex === 2}
                                    >
                                        <ListItemText primary={label.labelDescription} />
                                        <Checkbox
                                            id={'checklist/'+index}
                                            onChange={this.handleChangeCheckbox('checklist')}
                                            value='checklist'
                                        />
                                    </ListItem>
                                </div>
                            )
                        }):null}
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
                    card = {this.props.card}
                    labels = {this.props.labels}
                    onCreateLabel = {this.props.onCreateLabel}
                    onDeleteLabel = {this.props.onDeleteLabel}
                />
            </div>
        );
    }
}

Label.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
    card: state.card.card,
    labels: state.card.labels
});
const mapDispatchToProps = {
    onGetLabels : _action.cardAction.getLabels,
    onCreateLabel : _action.cardAction.createLinkLabel,
    onDeleteLabel : _action.cardAction.deleteLinkLabel
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Label));