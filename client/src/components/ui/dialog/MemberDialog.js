import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Done} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { styles } from './Style'



class MemberDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTitle:'',
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
                            id="outlined-multiline-static"
                            label="Email"
                            name="selectedValue"       
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('newTitle')}
                            />
                    <Button color="primary" className={classes.button}>
                        <Done className={classes.validIcon} />
                    </Button>
                </div>
                <Divider/>
                <DialogContentText>
                Members already in the project
                </DialogContentText>
                <List>
                    <ListItem><ListItemText primary="Mehdi Delvaux"></ListItemText></ListItem>
                    <ListItem><ListItemText primary="Cyril Pluche"></ListItemText></ListItem>
                    <ListItem><ListItemText primary="Enzo Fabre"></ListItemText></ListItem> 
                </List>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
      );
    }
  }

export default withStyles(styles)(MemberDialog)