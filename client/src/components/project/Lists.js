import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';

const liststodos = [
    {   listId:"list1", 
        listTitle: "To do",
        listContent:[
        {cardId : "card1", cardContent:"Contenu de la card1 dans lalist1"},
        {cardId : "card2", cardContent:"Contenu de la card2 dans lalist1"},
        {cardId : "card2", cardContent:"Contenu de la card2 dans lalist1"},
        ]
    },
    {   listId:"list3", 
        listTitle: "To do",
        listContent:[
        {cardId : "card5", cardContent:"Contenu de la card1 dans lalist1"},
        {cardId : "card6", cardContent:"Contenu de la card2 dans lalist1"}
        ]
    },
]


const styles = theme => ({
        listArea: {
            margin: theme.spacing.unit * 2,
            display: 'flex',
            padding:theme.spacing.unit * 2,           
            whiteSpace: `nowrap`
            
            
        },
    });
    
class Lists extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Droppable droppableId="allList" direction="horizontal" type="LISTS">
                {(provided) =>(
                    <div className={classes.listArea}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {liststodos.map((list, index) => 
                                        <List key={list.listId} list={list} index={index}></List>
                                    )}
                        {provided.placeholder}
                        <button>Add a list</button>
                    </div>
                )}
                
            </Droppable>          
        )
    }
}


export default withStyles(styles)(Lists)