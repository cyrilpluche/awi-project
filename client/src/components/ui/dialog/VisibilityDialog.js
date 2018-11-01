import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Done} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import _action from '../../../actions'

import { styles } from './Style'



class VisibilityDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTitle:'',
      submitted:false,
      visibility: ''
    }
  }

    componentWillReceiveProps(){
      if (this.props.projectInfo) this.setState({visibility: this.props.projectInfo.projectVisibility})
    }

    
    close = () =>{
        this.props.onClose()
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    updateVisibility(){

      if(this.state.visibility === 1){
          this.setState({visibility:0})
          this.props.updateProjectVisibility(0,this.props.projectInfo.projectId)
      }
      else{
        this.setState({visibility:1})
        this.props.updateProjectVisibility(1,this.props.projectInfo.projectId)
      }    
    }

    render() {
      const { projectInfo, classes, onClose, selectedValue, ...other } = this.props;

      return (
        <Dialog onClose={this.close.bind(this)} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Project visibility</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem><Button disabled={this.state.visibility === 0 ?true : false} onClick={this.updateVisibility.bind(this)} value={0}><ListItemText primary="Public" secondary="This project is visible by everyone. Read Only"></ListItemText>{this.state.visibility === 0? <Done/>:''}</Button></ListItem>
                    <ListItem><Button disabled={this.state.visibility === 1 ?true : false} onClick={this.updateVisibility.bind(this)} value={1}><ListItemText primary="Private" secondary="This project is only visible by project members"></ListItemText>{this.state.visibility === 1? <Done/>:''}</Button></ListItem>
                </List>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
      );
    }
  }
  const mapDispatchToProps ={
    updateProjectVisibility: _action.projectAction.updateProjectVisibility,
  }
export default connect(null,mapDispatchToProps)(withStyles(styles)(VisibilityDialog))