import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import {Send,Cancel} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import _action from '../../../actions'
import _helper from '../../../helpers'
import Checkbox from '@material-ui/core/Checkbox';
import MiniLoader from '../../ui/loader/MiniLoader'

import { styles } from './Style'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Fade from "@material-ui/core/Fade/Fade";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import OutlinedInput from "@material-ui/core/es/OutlinedInput/OutlinedInput";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Input from "@material-ui/core/es/Input/Input";



class MemberOnCard extends Component {
    constructor(props){
        super(props)
        this.addMember = this.addMember.bind(this)
        this.removeMember = this.removeMember.bind(this)
        this.handleOpenDialog = this.handleOpenDialog.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)

        this.state = {
            open: false
        }
    }

    /** We get both array from the store */
    componentWillMount () {
        /*this.setState({
            membersOnCard: this.props.membersOnCard,
            membersOffCard: this.props.membersOffCard,
            newMemberId: []
        })*/
        console.log(this.state)
    }

    /** Close the modal */
    handleOpenDialog = () => {
        this.setState({ open: true });
    };

    handleCloseDialog = () => {
        this.setState({ open: false });
    };

    /** ==================== ADD / REMOVE MEMBERS ==================== */
    addMember (event) {
        console.log('ADD MEMBER')
        console.log(this.props)

        /*if (_helper.Method.isTypeEmail(this.state.memberEmail)) {
            this.setState({ errorMsg: '' })
            let body = {
                memberEmail: this.state.memberEmail,
                projectId: this.props.projectInfo.projectId
            }
            this.props.sendInvitation(body)
            this.setState({ memberEmail: '' })
        } else {
            this.setState({ errorMsg: 'Please, provide a valid email adress.' })
        }*/
    }

    removeMember (event) {
        /*let index = event.currentTarget.id.split('/')[1]
        let member = this.state.membersOnCard[index]
        let cardId = this.props.card.cardId

        this.state.membersOffCard.push(member)
        this.state.membersOnCard.splice(index, 1)

        this.props.onRemoveMember(member.memberId, cardId, this.state.membersOffCard, this.state.membersOnCard)*/
    }

    handleChangeSelect = event => {
        this.setState({ name: event.target.value });
    };

    render() {
        const { isLoading, isAdmin, setAsAdministrator,removeMemberFromProject, sendInvitation, projectInfo, classes, onClose, selectedValue, ...other } = this.props;

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        return (
            <div>
                <Button onClick={this.handleOpenDialog}>Members</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog.bind(this)}
                    aria-labelledby="simple-dialog-title"
                    {...other}
                >
                    <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Members</DialogTitle>
                    <DialogContent>
                        <Grid alignItems='flex-end' container className={ classes.marginBottom }>
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    size='small'
                                    color="primary"
                                    className={classes.validIcon}
                                    onClick={this.addMember}
                                >
                                    Send
                                    <Send className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps ={
    onAddMember: _action.cardAction.addMember,
    onRemoveMember: _action.cardAction.removeMember
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberOnCard))