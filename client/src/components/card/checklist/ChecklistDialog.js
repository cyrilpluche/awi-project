import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { styles } from './StyleChecklist'
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import _action from "../../../actions";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";


class ChecklistDialog extends React.Component {
    constructor (props) {
        super(props)
        this.handleRemoveTask = this.handleRemoveTask.bind(this)
        this.state = {
            card: this.props.card
        }
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleChangeCheckbox = name => event => {
        //this.setState({ [name]: event.target.checked });
        let index = event.target.id.split('/')[1]
        let chtState = event.target.checked
        this.state.card.TaskCardFks[index].chtState = chtState

        let card = this.state.card
        let taskId = this.state.card.TaskCardFks[index].taskId

        this.props.onUpdateTask(card, taskId, {chtState: chtState})
        this.setState({ maj: true });
    };

    handleRemoveTask = event => {
        let taskId = event.currentTarget.id;
        this.props.onDeleteTask(taskId);
        this.setState({ maj: true });
    };

    /*handleUpdateTask = event => {
        let taskId = event.currentTarget.id
        //this.props.checklist[object.index].chtState = !object.value;
        this.props.onUpdateTask(taskId,{chtState: !object.value})
    }*/

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
                <DialogTitle id="simple-dialog-title">Set checklist</DialogTitle>
                <div className={classes.form}>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            {this.props.card.TaskCardFks.map((task, index) => {
                                    return (
                                        <div key={task.taskId}>
                                            <button id={task.taskId} onClick={this.handleRemoveTask}>
                                                <SvgIcon className={this.props.classes.deleteIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>}</SvgIcon>
                                            </button>
                                            <FormControlLabel className={this.props.classes.formLabel}
                                                              control={
                                                                  <Checkbox
                                                                      id={'checklist/'+index}
                                                                      onChange={this.handleChangeCheckbox('checklist')}
                                                                      value='checklist'
                                                                      checked={task.chtState}
                                                                  />
                                                              }
                                                              label={task.taskTitle}
                                            />
                                        </div>
                                    )
                                }
                            )}
                        </FormGroup>
                    </FormControl>
                </div>
                <button>
                    <SvgIcon className={classes.addIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}</SvgIcon>
                </button>
            </Dialog>
        );
    }
}

ChecklistDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
    onUpdateTask: PropTypes.func
};

const ChecklistDialogWrapped = withStyles(styles)(ChecklistDialog);


class Checklist extends React.Component {
    state = {
        open: false
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
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Checklist</Button>
                <ChecklistDialogWrapped
                    open={this.state.open}
                    onClose={this.handleClose}
                    card = {this.props.card}
                    onUpdateTask = {this.props.onUpdateTask}
                    onDeleteTask = {this.props.onDeleteTask}
                />
            </div>
        );
    }
}

Checklist.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
    card: state.card.card
});
const mapDispatchToProps = {
    onUpdateTask : _action.cardAction.updateTask,
    onDeleteTask : _action.cardAction.deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);