import React from 'react';
import PropTypes from 'prop-types';
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


class ChecklistDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
                <DialogTitle id="simple-dialog-title">Set checklist</DialogTitle>
                <div className={classes.form}>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            <div>
                                <SvgIcon className={classes.deleteIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>}</SvgIcon>
                                <FormControlLabel className={classes.formLabel}
                                    control={
                                        <Checkbox onChange={this.handleChange('gilad')} value="gilad" />
                                    }
                                    label="******************************************"
                                />
                                </div>
                            <div>
                                <SvgIcon className={classes.deleteIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>}</SvgIcon>
                                <FormControlLabel className={classes.formLabel}
                                    control={
                                        <Checkbox  onChange={this.handleChange('jason')} value="jason" />
                                    }
                                    label="*****************************************"
                                />
                            </div>
                        </FormGroup>
                    </FormControl>
                </div>
                <SvgIcon className={classes.addIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}</SvgIcon>
            </Dialog>
        );
    }
}

ChecklistDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
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
                />
            </div>
        );
    }
}

export default Checklist;