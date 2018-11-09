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
import Input from "@material-ui/core/Input/Input";
import MiniLoader from "../../ui/loader/MiniLoader";


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
        let index = event.target.id.split('/')[1]
        let chtState = event.target.checked
        this.state.card.TaskCardFks[index].chtState = chtState

        let card = this.state.card
        let taskId = this.state.card.TaskCardFks[index].taskId

        this.props.onUpdateTask(card, taskId, {chtState: chtState})
        this.setState({ maj: true });
    };

    handleCreateTask = event => {
        let dom = document.querySelector('#newChecklist');
        let value = dom.value;
        if(value !== ''){
            let cardId = this.props.card.cardId;
            let newTask = {
                taskTitle: value,
                chtState: false,
                cardId: cardId
            };
            let card = this.props.card
            this.props.onCreateTask(newTask, card)
        }
    };

    handleRemoveTask = event => {
        let index = event.currentTarget.id;
        let taskId = this.props.card.TaskCardFks[index].taskId
        this.state.card.TaskCardFks.splice(index,1)
        let card = this.props.card
        this.props.onDeleteTask(taskId, card);
        this.setState({ maj: true });
    };

    render() {
        const { classes, onClose, selectedValue, onCreateTask, onUpdateTask, onDeleteTask, isLoading, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
                <DialogTitle id="simple-dialog-title">Set checklist</DialogTitle>
                <div className={classes.form}>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            { isLoading ? (
                                <MiniLoader/>
                            ) :  this.state.card.TaskCardFks ? this.props.card.TaskCardFks.map((task, index) => {
                                    return (
                                        <div key={task.taskId}>
                                            <button id={index} onClick={this.handleRemoveTask}>
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
                            ) : null}
                            <div>
                                <Input
                                    id = 'newChecklist'
                                    placeholder="New checklist"
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                                <button onClick={this.handleCreateTask}>
                                    <SvgIcon className={classes.addIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}</SvgIcon>
                                </button>
                            </div>
                        </FormGroup>
                    </FormControl>
                </div>
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
        const { classes } = this.props

        return (
            <div>
                <Button
                    color="primary"
                    className={classes.button}
                    fullWidth
                    onClick={this.handleClickOpen}
                >
                    Checklist
                </Button>
                <ChecklistDialogWrapped
                    open={this.state.open}
                    onClose={this.handleClose}
                    card = {this.props.card}
                    onUpdateTask = {this.props.onUpdateTask}
                    onDeleteTask = {this.props.onDeleteTask}
                    onCreateTask = {this.props.onCreateTask}
                />
            </div>
        );
    }
}

Checklist.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
    card: state.card.card,
    isLoading: state.card.isLoading
});
const mapDispatchToProps = {
    onUpdateTask : _action.cardAction.updateTask,
    onDeleteTask : _action.cardAction.deleteTask,
    onCreateTask : _action.cardAction.createTask
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checklist));