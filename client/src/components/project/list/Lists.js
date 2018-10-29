import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import _action from '../../../actions'





class Lists extends Component {
    constructor(props){
        super(props)
        this.state = {
            newListname:''
        }
    }


    createNewList(){
        let listName = this.state.newListname
        let idProject = this.props.idProject
        this.props.createList(listName,idProject)
    }


    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        console.log(this.state.newListname)
    
    };



    
    render() {
        const { classes,lists} = this.props;
        console.log(lists)
        return (
            <Droppable droppableId="allList" direction="horizontal" type="LIST">
                {(provided) =>(
                    <div className={classes.listArea}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {lists.map((list, index) => 
                                        <List key={list.listTitle} list={list} index={index}></List>
                                    )}
                        {provided.placeholder}
                        <div><TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        onChange={this.handleChange('newListname')}
                        margin="normal"
                        /><Button onClick={this.createNewList.bind(this)} variant="fab"  aria-label="Add" className={classes.buttonList}>
                            <AddIcon />
                        </Button></div>
                        
                    </div>
                )}
                
            </Droppable>          
        )
    }
}


const mapDispatchToProps ={
createList: _action.projectAction.createList
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(Lists))