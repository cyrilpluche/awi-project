import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Send} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import _action from '../../../actions'
import Checkbox from '@material-ui/core/Checkbox';

import { styles } from './Style'
import Grid from "@material-ui/core/Grid/Grid";
import Fade from "@material-ui/core/Fade/Fade";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import MiniLoader from "../../ui/loader/MiniLoader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";

class MemberOnCard extends Component {
    constructor(props){
        super(props)
        this.addMember = this.addMember.bind(this)
        this.removeMember = this.removeMember.bind(this)
        this.handleOpenDialog = this.handleOpenDialog.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

        this.state = {
            open: false
        }
    }

    /** We get both array from the store */
    componentDidMount () {
        this.props.onGetMembersOnCard(this.props.card.cardId, this.props.route.params.id)

        this.setState({
            membersOnCard: this.props.membersOnCard,
            membersOffCard: this.props.membersOffCard,
            newMemberIndex: -1
        })
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
        const { onAddMember, listIndex, cardIndex } = this.props

        let index = this.state.newMemberIndex
        let member = this.props.membersOffCard[index]
        let cardId = this.props.card.cardId

        //We copy previous arrays
        let membersOnCard = Array.from(this.props.membersOnCard)
        let membersOffCard = Array.from(this.props.membersOffCard)

        membersOnCard.push(member)
        membersOffCard.splice(index, 1)

        if(member) onAddMember(member.memberId, cardId, membersOnCard, membersOffCard, listIndex, cardIndex, member)

        this.setState({
            membersOnCard: membersOnCard,
            membersOffCard: membersOffCard
        })
    }

    removeMember = name => event => {
        const { onRemoveMember, listIndex, cardIndex } = this.props

        let index = event.currentTarget.id.split('/')[1]
        let member = this.props.membersOnCard[index]
        let cardId = this.props.card.cardId

        //We copy previous arrays
        let membersOnCard = Array.from(this.props.membersOnCard)
        let membersOffCard = Array.from(this.props.membersOffCard)

        //New arrays
        membersOffCard.push(member)
        membersOnCard.splice(index, 1)

        onRemoveMember(member.memberId, cardId, membersOnCard, membersOffCard, listIndex, cardIndex, index)
        this.setState({ maj: true })
    }

    handleChangeNewMember = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { membersOnCard, membersOffCard, classes, ...other } = this.props;

        /** Members on the card */
        const activeMembersList = (
            <List className={ classes.memberList + ' ' + classes.marginBottomTop + ' ' + classes.modalWidth}>
                {this.props.isloading  === 'true' ?
                    <MiniLoader size={15} />
                    :
                    <div>
                        {membersOnCard.map((member, index) =>
                            <ListItem key={member.memberId} className={classes.memberItem}>
                                <ListItemText primary={member.memberPseudo}>
                                </ListItemText>
                                <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{timeout: 600}}
                                    title="Remove"
                                    placement="top-start">
                                    <Checkbox
                                        checked={true}
                                        id={"members/" + index}
                                        onChange={this.removeMember('membersOnCard')}
                                        value='membersOnCard'
                                    />
                                </Tooltip>
                            </ListItem>
                        )}
                    </div>
                }
            </List>
        )

        /** Members off the card */
        const otherMembers = (
            <div className={ classes.modalWidth}>
                {this.props.isloading === 'true' ?
                    <MiniLoader size={15} />
                    :
                    <FormControl className={classes.formControl + ' ' + classes.modalWidth}>

                        <InputLabel htmlFor="new-member">Members</InputLabel>
                        <Select
                            value={this.state.newMemberIndex}
                            onChange={this.handleChangeNewMember}
                            inputProps={{
                                name: 'newMemberIndex',
                                id: 'new-member',
                            }}
                        >
                            {membersOffCard.map((member, index) =>
                                <MenuItem key={index} value={index}>{member.memberPseudo}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }
            </div>
        )

        return (
            <div>
                <Button
                    color="primary"
                    className={classes.button}
                    fullWidth
                    onClick={this.handleOpenDialog}
                >
                    Members
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog.bind(this)}
                    aria-labelledby="simple-dialog-title"
                    {...other}
                >
                    <DialogTitle id="simple-dialog-title">Members</DialogTitle>
                    <DialogContent className={ classes.modalWidth } >
                        <Grid alignItems='flex-end' container className={ classes.marginBottom }>
                            <Grid item xs={12}>
                                {otherMembers}
                            </Grid>
                            <Grid item xs={12}>
                                {activeMembersList}
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
    isloading: state.card.isLoading.toString(),
    membersOnCard: state.card.membersOnCard,
    membersOffCard: state.card.membersOffCard
})
const mapDispatchToProps ={
    onAddMember: _action.cardAction.addMember,
    onRemoveMember: _action.cardAction.removeMember,
    onGetMembersOnCard: _action.cardAction.getMembersOnCard
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberOnCard))