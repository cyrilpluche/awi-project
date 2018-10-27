import React, { Component } from 'react';
import Card from './Card'
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const cards = [
        {cardId : 1, cardContent:"je suis la carte 1"},
        {cardId : 2, cardContent:"je suis la carte 2"}]
  
const styles = theme => ({
            progress: {
                margin: theme.spacing.unit * 2,
                border:`1px solid blue`,
                
            },
            titles: {
                textAlign:`center`,
                backgroundColor:`lightgrey`
            }
        });

class List extends Component{

    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.list.listId} index={this.props.index}>
                {(provided) =>(
                    <div className={classes.progress} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <h5 className={classes.titles}>{this.props.list.listTitle}</h5>
                        {this.props.list.listContent.map(card =><Card key={card.cardId} card={card}></Card> ) }
                    </div>
                )}
                 
            </Draggable>   
        )
    }
}

export default withStyles(styles)(List)