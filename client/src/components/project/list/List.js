import React, { Component } from 'react';
import Card from '../card/Card'
import { withStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { styles } from './Style'


class List extends Component{
   

    render() {
        const {classes, list} = this.props
        return (
            <Draggable draggableId={this.props.list.listId} index={this.props.index}>
                {(provided) =>(
                    <div className={classes.list} 
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                    >
                        <h4 className={classes.listTitle} {...provided.dragHandleProps}>{this.props.list.listTitle}</h4>
                        <Button className={classes.button} variant="fab" mini  aria-label="Add">
                            <AddIcon />
                        </Button>
                        <Droppable droppableId={this.props.list.listId} type="CARD">
                            {(provided) =>(
                                    <div 
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                    className={classes.dropSpace}>
                                        {list.listContent.map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ) }
                                    {provided.placeholder}
                                    
                                    </div>
                            )}
                        </Droppable>
                        
                        
                    </div>
                )}           
            </Draggable>   
        )
    }
}

export default withStyles(styles)(List)