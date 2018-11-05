import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'
import SimpleDialog from '../../ui/dialog/SimpleDialog'



class Lists extends Component {
    constructor(props){
        super(props)
        this.state = {
            newListname:'',
            open: false,
        }
    }


    createNewList(){
        let listName = this.state.newListname
        let idProject = this.props.idProject
        if(listName) this.props.createListCallback(listName,idProject)
    }


    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    
    };

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };

    handleClose = (value) => {
        this.setState({ newListname: value, open: false }, function(){  this.createNewList()});       
    };

    
    render() {
        const { classes,lists,idProject} = this.props;
        
        return (
            <Droppable droppableId="allList" direction="horizontal" type="LIST">
                {(provided) =>(
                    <div className={classes.listArea}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {lists.length === 0 ? '' :lists.map((list, index) => 
                            <List idProject={idProject} key={list.listTitle} list={list} index={index}></List>
                            )}
                        {provided.placeholder}
                        <div>
                            <Button onClick={this.handleClickOpen} variant="fab"  aria-label="Add" className={classes.buttonList}>
                                <AddIcon />
                            </Button>
                        </div>
                        <SimpleDialog
                            type="list"
                            open={this.state.open}
                            onClose={this.handleClose}
                        />
                        
                    </div>
                )}
                
            </Droppable>          
        )
    }
}


/**/

export default withStyles(styles)(Lists)