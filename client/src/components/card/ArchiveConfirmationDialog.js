import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _action from "../../actions";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";

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
            console.log("here")
            this.props.card.cardStatus = 1;
            this.props.onUpdateCard(this.props.card, {cardStatus: 1});
            this.setState({ open: false });
        }else{
            this.setState({ open: false }); //ToDo handle the delete here
        }
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>{this.state.type}</Button>
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
                        <Button onClick={this.handleClose} color="primary">
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

ConfirmationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    card: state.updatecard.card
})
const mapDispatchToProps = {
    onUpdateCard : _action.updateCardAction.updatecard
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);