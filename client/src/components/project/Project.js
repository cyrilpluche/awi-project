import React, { Component } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`
    },
});



class Project extends Component {
    onDragEnd = result =>{
        //Todo
    }
    render() {  
        const {classes} = this.props
        return (
            <div className={classes.projectBody}>
                
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Lists ></Lists>
                </DragDropContext>
            </div>
        )
    }
}




export default withStyles(styles)(Project)
