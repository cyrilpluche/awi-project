import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'






class Lists extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Droppable droppableId="allList" direction="horizontal" type="LIST">
                {(provided) =>(
                    <div className={classes.listArea}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {this.props.listTodos.map((list, index) => 
                                        <List key={list.listId} list={list} index={index}></List>
                                    )}
                        {provided.placeholder}
                        <Button variant="fab"  aria-label="Add" className={classes.buttonList}>
                            <AddIcon />
                        </Button>
                    </div>
                )}
                
            </Droppable>          
        )
    }
}


export default withStyles(styles)(Lists)