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
                backgroundColor:`white`,
                minHeight:`100px`
                
            },
            titles: {
                textAlign:`center`,
                backgroundColor:`lightgrey`
            }
        });

class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            cards : this.props.list.listContent
        }
    }
    addCard(){
        const oldCards = this.state.cards
        console.log(oldCards)
        const newCard = {cardId:oldCards.size+1, cardContent:"Je suis un carte ajouté"}
        const newCards = Object.assign({newCard}, oldCards)
        console.log(newCards)
        this.setState({[cards]:newCards})
    }
    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.list.listId} index={this.props.index}>
                {(provided) =>(
                    <div className={classes.progress} 
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                    >
                        <h5 className={classes.titles} {...provided.dragHandleProps}>{this.props.list.listTitle}</h5>
                        <Droppable droppableId={this.props.list.listId}>
                            {(provided) =>(
                                    <div 
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}>
                                        {this.state.cards.map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ) }
                                    {provided.placeholder}
                                    </div>
                            )}
                        </Droppable>
                        <button onClick={this.addCard.bind(this)}>Add a card</button>
                    </div>
                )}           
            </Draggable>   
        )
    }
}

export default withStyles(styles)(List)