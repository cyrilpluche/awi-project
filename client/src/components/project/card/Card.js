import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Draggable } from 'react-beautiful-dnd';
import { styles } from './Style'

import CardElement from '../../card/Card'


class Card extends Component{

    render() {
        const {classes} = this.props
        return (
            <div className={ classes.listElement }>
                <Draggable
                    key={this.props.card.cardId}
                    draggableId={this.props.card.cardId}
                    index={this.props.index}
                >
                    {(provided, snapshot) =>  {
                        return (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <CardElement
                                    currentCard={this.props.card}
                                    listIndex={this.props.listIndex}
                                    cardIndex={this.props.cardIndex}
                                    route={this.props.route}
                                />
                            </div>
                        )}}
                </Draggable>
            </div>
        )
    }
}

export default withStyles(styles)(Card)