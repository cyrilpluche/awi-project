import React, { Component } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './Lists'

import { withStyles } from '@material-ui/core/styles';



class Project extends Component {
    onDragEnd = result =>{
        //Todo
    }
    render() {  
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Lists ></Lists>
            </DragDropContext>
           
        )
    }
}




export default Project
