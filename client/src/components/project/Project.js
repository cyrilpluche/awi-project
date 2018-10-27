import React, { Component } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'

import { withStyles } from '@material-ui/core/styles';
import {findWhere} from 'underscore'



let liststodos = [
    {   listId:"list1", 
        listTitle: "To do",
        listContent:[
            {cardId : 1, cardContent:"Contenu de la card1 dans lalist1"},
            {cardId : 2, cardContent:"Contenu de la card2 dans lalist1zaezaeaeaeaeze"},
            {cardId : 3, cardContent:"Contenu de la card2 dans lalist1"},
        
        ]
    },
    {   listId:"list3", 
        listTitle: "In Progress",
        listContent:[
            {cardId : 4, cardContent:"Contenu de la card1 dans lalist1"},
            {cardId : 5, cardContent:"Contenu de la card2 dans lalist1"}
        ]
    },
]

const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`
    },
});




class Project extends Component {

    constructor(props){
        super(props)
        this.state = {
            data : liststodos
        }
    }
   

    onDragEnd = (result) => {

        //retrieve source and destination data (given by dnd)
        const { source, destination,draggableId } = result;
        

        // dropped outside the list
        if (!destination) {
            return;
        }
        if(result.type === 'LIST'){
            
            let findList = findWhere(liststodos,{listId: draggableId})
            
            let indexOfList = liststodos.indexOf(findList)
            let newLists = liststodos

            //remove list from list of list
            newLists.splice(indexOfList,1,)

            newLists.splice(destination.index,0,findList)
            
            this.setState({data:newLists})
        }
        if (result.type === 'CARD') {
            
            let originalList = findWhere(liststodos, {listId: source.droppableId})
            
            let originalListIndex = liststodos.indexOf(originalList)
            
            let newList = findWhere(liststodos,{listId: destination.droppableId}) 
             
            let newListIndex = liststodos.indexOf(newList)
             

            let newLists = liststodos.slice()
            let card = liststodos[originalListIndex].listContent[source.index]
            newLists[originalListIndex].listContent.splice(result.source.index, 1)
            newLists[newListIndex].listContent.splice(result.destination.index, 0, card)
            
            
            this.setState({data:newLists})
        }


    };
    
    render() {  
        const {classes} = this.props
        return (
            <div className={classes.projectBody}>
                
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Lists key="1" listTodos={this.state.data} ></Lists>
                </DragDropContext>
            </div>
        )
    }
}




export default withStyles(styles)(Project)
