import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Send} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import _action from '../../../actions'

import { styles } from './Style'



class MemberDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      invitationEmail:'',
      submitted:false
    }
  }
  


    
    close = () =>{
        this.props.onClose()
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    submitInvitation(){
      this.props.sendInvitation(this.state.invitationEmail, this.props.projectInfo.projectId)
    }

    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      
      return (
        <Dialog onClose={this.close.bind(this)} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Members</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Enter email adress to send an invitation
                </DialogContentText>
                <div className={classes.divider}>
                    <TextField
                            id="invitationEmail"
                            label="Email"
                            name="invitationEmail"       
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('invitationEmail')}
                            />
                    <Button color="primary" className={classes.button} onClick={this.submitInvitation.bind(this)}>
                        <Send className={classes.validIcon} />
                    </Button>
                </div>
                <Divider/>
                <DialogContentText>
                  Members already in the project
                </DialogContentText>
                <List>
                  {this.props.members? this.props.members.map(member => <ListItem key={member.memberId}><ListItemText primary={member.memberFirstname+" "+member.memberLastname}></ListItemText></ListItem>):''}
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
})
const mapDispatchToProps ={
    sendInvitation: _action.projectAction.sendInvitationProject,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MemberDialog))