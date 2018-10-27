import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Draggable } from 'react-beautiful-dnd';
import { light } from '@material-ui/core/styles/createPalette';


const styles = theme => ({
    progress: {
        marginBottom: theme.spacing.unit * 2,
        border:`1px solid lightgrey` ,
        padding:theme.spacing.unit * 2,
        
    },
});

class Card extends Component{

    

    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.card.cardId} index={this.props.index}>
                {(provided, snapshot) => (
                <div className={classes.progress} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging = {snapshot.isDragging}>                  
                    
                    >{this.props.card.cardContent}
                </div>
                )}
            </Draggable>
        )
    }
}

export default withStyles(styles)(Card)