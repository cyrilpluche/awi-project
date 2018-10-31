import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SimpleDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTitle:'',
      submitted:false
    }
  }
  


    handleClose = () => {
      console.log(this.state.newTitle)
      console.log(this.state.submitted)
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
            <DialogTitle id="simple-dialog-title">Add a new {this.props.type} </DialogTitle>
            <DialogContent>
                <TextField
                        id="outlined-multiline-static"
                        label="Card name"
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
                        Add card
                    </Button>
            </DialogActions>
        </Dialog>
      );
    }
  }

export default SimpleDialog