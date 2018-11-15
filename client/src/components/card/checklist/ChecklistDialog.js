import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { styles } from './StyleChecklist'
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import _action from "../../../actions";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";
import MiniLoader from "../../ui/loader/MiniLoader";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Cancel} from "@material-ui/icons";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from "@material-ui/core/IconButton/IconButton";
import Fade from "@material-ui/core/Fade/Fade";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";

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
        let value = event.target.checked
        let card = Object.assign({}, this.state.card)
        card.TaskCardFks[index].chtState = value //TODO put and setState in this version its not immutable
        let taskId = this.state.card.TaskCardFks[index].taskId

        this.props.onUpdateTask(taskId, {chtState: value})
        this.setState({ card: card });
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
                <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Checklist</DialogTitle>
                <List className={ classes.memberList + ' ' + classes.marginBottomTop }>
                    { isLoading ? (
                        <MiniLoader/>
                    ) :  this.state.card.TaskCardFks ? this.props.card.TaskCardFks.map((task, index) => {
                            return (
                                <ListItem key={task.taskId} className={ classes.memberItem }>
                                    <ListItemText primary={task.taskTitle}/>
                                    <IconButton id={index} color="secondary" onClick={this.handleRemoveTask}>
                                        <Cancel />
                                    </IconButton>
                                    <Tooltip
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 600 }}
                                        title="Remove"
                                        placement="top-start">
                                        <Checkbox
                                            checked={task.chtState}
                                            id={'checklist/'+index}
                                            onChange={this.handleChangeCheckbox('checklist')}
                                            value='checklist'
                                        />
                                    </Tooltip>
                                </ListItem>
                            )
                        }
                    ) : null}
                </List>
                <Grid container justify='center'>
                    <Grid xs={11} item>
                        <Typography variant='caption'>
                            Add a new task
                        </Typography>
                    </Grid>
                </Grid>
                <Grid justify='center' alignItems='flex-end' container className={ classes.marginBottom }>
                    <Grid item xs={11}>
                        <TextField
                            id = 'newChecklist'
                            label="task"
                            fullWidth
                            //value={this.state.newTask}
                            name="newChecklist"
                            margin="normal"
                            variant="outlined"
                            //onChange={this.handleChange('memberEmail')}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            fullWidth
                            size='small'
                            color="primary"
                            className={classes.validIcon}
                            onClick={this.handleCreateTask.bind(this)}
                        >
                            Add
                            <AddCircleIcon className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
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
    isLoading: state.card.isLoading
});
const mapDispatchToProps = {
    onUpdateTask : _action.cardAction.updateTask,
    onDeleteTask : _action.cardAction.deleteTask,
    onCreateTask : _action.cardAction.createTask
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checklist));