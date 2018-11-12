import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles } from '@material-ui/core/styles';
import { styles } from './Style'

class SimpleDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTitle:'',
      submitted:false
    }
  }
  


    handleClose = () => {
      const newTitle = this.state.newTitle
      this.setState({newTitle:''}, function() { 
        if(!this.state.submitted) this.props.onClose('')
        else this.props.onClose(newTitle)}
      )
     
    };

    handleSubmit = () => {
        this.setState({submitted:true}, function() { this.handleClose()} )      
      };
    
    close = () =>{
        this.setState({submitted:false}, function() { this.handleClose()} )
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      
      return (
        <Dialog onClose={this.close} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Add a new {this.props.type} </DialogTitle>
            <DialogContent>
                <TextField
                        id="outlined-multiline-static"
                        label={this.props.type+" name"}
                        name="selectedValue"
                        multiline
                        rows="3"         
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('newTitle')}
                        />
            </DialogContent>
            <DialogActions>
                    <Button variant="contained" disabled={this.state.newTitle ? false : true} onClick={this.handleSubmit.bind(this)} color="primary" fullWidth size="small">
                        Add {this.props.type}
                    </Button>
            </DialogActions>
        </Dialog>
      );
    }
  }

  export default withStyles(styles)(SimpleDialog)