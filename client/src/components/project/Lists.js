import React, { Component } from 'react';
import List from './List'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const liststodos = [
    {   listId:1, 
        listTitle: "To do",
        listContent:[
        {cardId : 1, cardContent:"Contenu de la card1 dans lalist1"},
        {cardId : 2, cardContent:"Contenu de la card2 dans lalist1"}
        ]
    },
    {
        listId:2, 
        listTitle: "In progress",
        listContent:[
        {cardId : 3, cardContent:"Contenu de la card1 dans lalist2"},
        {cardId : 4, cardContent:"Contenu de la card2 dans lalist2"}
        ]  
    }]


const styles = theme => ({
        progress: {
            margin: theme.spacing.unit * 2,
            display: 'flex',
            
        },
    });

class Lists extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Droppable droppableId="allList" direction="horizontal">
                {(provided) =>(
                    <div className={classes.progress}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {liststodos.map((list, index) => 
                                        <List key={list.listId} list={list} index={index}></List>
                                    )}
                        {provided.placeholder}
                    </div>
                )}
                
            </Droppable>          
        )
    }
}


export default withStyles(styles)(Lists)