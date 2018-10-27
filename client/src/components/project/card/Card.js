import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Draggable } from 'react-beautiful-dnd';
import { styles } from './Style'




class Card extends Component{

    

    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.card.cardId} index={this.props.index}>
                {(provided, snapshot) => (
                <div className={classes.card} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}                               
                    >
                    {this.props.card.cardContent}
                </div>
                )}
            </Draggable>
        )
    }
}

export default withStyles(styles)(Card)