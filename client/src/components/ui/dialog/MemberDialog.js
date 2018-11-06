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



class MemberDialog extends Component {
    constructor(props){
        super(props)
        this.handleRemoveFromProject = this.handleRemoveFromProject.bind(this)

        this.state = {
            memberEmail: '',
            submitted: false,
            errorMsg: ''
        }
    }

    close = () =>{
        this.setState({
            memberEmail: '',
            submitted: false,
            errorMsg: ''
        })
        this.props.onClose()
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitInvitation(){
        if (_helper.Method.isTypeEmail(this.state.memberEmail)) {
            this.setState({ errorMsg: '' })
            let body = {
                memberEmail: this.state.memberEmail,
                projectId: this.props.projectInfo.projectId
            }
            this.props.sendInvitation(body)
            this.setState({ memberEmail: '' })
        } else {
            this.setState({ errorMsg: 'Please, provide a valid email adress.' })
        }
    }

    handleRemoveFromProject (event) {
        let query = {
            projectId: this.props.projectInfo.projectId,
            memberId: event.currentTarget.id.split('/')[1]
        }
        this.props.removeMemberFromProject(query)
    }

    handleSetAsAdmin(memberId){
        this.props.removeMemberFromProject(this.props.projectInfo.projectId,memberId)
    }

    render() {
        const { isLoading, isAdmin, setAsAdministrator,removeMemberFromProject, sendInvitation, projectInfo, classes, onClose, selectedValue, ...other } = this.props;
        return (
            <Dialog
                onClose={this.close.bind(this)}
                aria-labelledby="simple-dialog-title"
                {...other}
            >
                <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Members</DialogTitle>
                <DialogContent className={ classes.memberDialog }>
                    <DialogContentText>
                        Add a user on the project
                    </DialogContentText>
                    <Grid alignItems='flex-end' container className={ classes.marginBottom }>
                        <Grid item xs={12}>
                            <TextField
                                id="invitationEmail"
                                label="Email"
                                disabled={this.props.isLoading}
                                error={this.state.errorMsg !== ''}
                                fullWidth
                                value={this.state.memberEmail}
                                type='email'
                                name="invitationEmail"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange('memberEmail')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                size='small'
                                color="primary"
                                className={classes.validIcon}
                                onClick={this.submitInvitation.bind(this)}
                            >
                                Send
                                <Send className={classes.rightIcon} />
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography variant='caption' className={ classes.errorMsg }>
                        {this.state.errorMsg}
                    </Typography>

                    <DialogContentText>
                        Active members
                    </DialogContentText>
                    <Divider/>
                    <List className={ classes.memberList + ' ' + classes.marginBottomTop }>
                        { isLoading ? (
                            <MiniLoader/>
                        ) :  this.props.members ? this.props.members.map(member =>
                            member.memberhasprojectStatus === 1 ? (
                                <ListItem key={member.Member.memberId} className={ classes.memberItem }>
                                    <ListItemText primary={member.Member.memberEmail}>
                                    </ListItemText>
                                    <div>
                                        {this.props.isAdmin === true ?
                                            <div>
                                                <IconButton id={'member/' + member.Member.memberId} color="secondary"  onClick={this.handleRemoveFromProject}>
                                                    <Cancel />
                                                </IconButton>
                                                <Checkbox onClick={this.handleSetAsAdmin}/>
                                            </div> : '' }
                                    </div>
                                </ListItem>
                            ) : null
                        ) : null }
                    </List>

                    <DialogContentText>
                        Invited members
                    </DialogContentText>
                    <Divider/>
                    <List className={ classes.memberList }>
                        { isLoading ? (
                            <MiniLoader/>
                        ) :  this.props.members ? this.props.members.map(member =>
                            member.memberhasprojectStatus !== 1 ? (
                                <ListItem key={member.Member.memberId} className={ classes.memberItem }>
                                    <ListItemText primary={member.Member.memberEmail}>
                                    </ListItemText>
                                    <div>
                                        {this.props.isAdmin === true ?
                                            <Button id={'member/' + member.Member.memberId} onClick={this.handleRemoveFromProject}>
                                                <Cancel />
                                            </Button> : '' }
                                    </div>
                                </ListItem>
                            ) : null
                        ) : null }
                    </List>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    projectInfo : state.project.projectInfo || [],
    members : state.project.members,
    isLoading: state.project.isLoading
})
const mapDispatchToProps ={
    sendInvitation: _action.projectAction.sendInvitationProject,
    removeMemberFromProject : _action.projectAction.removeMemberFromProject,
    setAsAdministrator : _action.projectAction.setMemberAsAdmin
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberDialog))