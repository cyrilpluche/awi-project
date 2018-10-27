import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'

const liststodos = [
    {   listId:"list1", 
        listTitle: "To do",
        listContent:[
            {cardId : "card1", cardContent:"Contenu de la card1 dans lalist1"},
            {cardId : "card2", cardContent:"Contenu de la card2 dans lalist1zaezaeaeaeaeze"},
            {cardId : "card3", cardContent:"Contenu de la card2 dans lalist1"},
        
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