import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _action from "../../../actions/index";
import connect from "react-redux/es/connect/connect";
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Style'

class ConfirmationDialog extends React.Component {
    state = {
        open: false,
        type: this.props.content.type
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    changeStatusArchived = () => {
        if(this.state.type === 'archive'){

           this.props.onUpdateCard(this.props.card, {cardStatus : 1}, this.props.listIndex, this.props.cardIndex);
           this.props.handleParentClose()
           this.setState({ open: false });
        }else{

            this.props.onDeleteCard(this.props.card.cardId, this.props.listIndex, this.props.cardIndex);
            this.props.handleParentClose()
            this.setState({ open: false });
        }
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
                    {this.state.type}
                </Button>
                <Dialog
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to {this.state.type} this card ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.changeStatusArchived} color="primary">
                            {this.state.type}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

/*
ConfirmationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
    onUpdateCard : _action.cardAction.updatecard,
    onDeleteCard : _action.cardAction.deleteCard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConfirmationDialog));