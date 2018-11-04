import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Draggable } from 'react-beautiful-dnd';
import { styles } from './Style'




class Card extends Component{

    

    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.card.cardId} index={this.props.index}>
                {(provided, snapshot) =>  {
                    const style = {
                        //backgroundColor: snapshot.isDragging ? 'lightblue' : 'lightgreen',
                        fontSize: 18,
                        ...provided.draggableProps.style,
                    };
                    return (
                <div className={classes.card} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                    style={style}                             
                    >
                    {this.props.card.cardTitle}
                </div>
                )}}
            </Draggable>
        )
    }
}

export default withStyles(styles)(Card)