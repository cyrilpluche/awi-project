import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Draggable } from 'react-beautiful-dnd';
import { styles } from './Style'

import CardElement from '../../card/Card'


class Card extends Component{

    render() {
        const {classes} = this.props
        return (
            <Draggable key={this.props.card.cardId} draggableId={this.props.card.cardId} index={this.props.index}>
                {(provided, snapshot) =>  {
                    const style = {
                        //backgroundColor: snapshot.isDragging ? 'lightblue' : 'lightgreen',
                        fontSize: 18,
                        ...provided.draggableProps.style,
                    };
                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <CardElement currentCard={this.props.card} />
                        </div>
                    )}}
            </Draggable>
        )
    }
}

export default withStyles(styles)(Card)