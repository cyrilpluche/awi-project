import React, { Component } from 'react';
import { connect } from 'react-redux'
import _action from '../../actions'
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'
import { withStyles } from '@material-ui/core/styles';
import {findWhere} from 'underscore'
import { Button } from '@material-ui/core';




const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`
    },
});




class Project extends Component {

    constructor(props){
        super(props)
        this.state = {
            lists : []
        }
    }

    componentWillMount() {
        this.props.getAllLists(this.props.match.params.id)
        this.props.findAllCards()
        
    }
    


    orderList(lists){
       
        if(lists.length !== 0){
            const headList = findWhere(lists,{listFather: null})
            const indexHead = lists.indexOf(headList)
            lists.splice(indexHead,1)
            this.recursiveOrdering(lists,headList,[headList])
            
            return this.state.lists
        }
        else{
            return lists
        }
        
    }


    recursiveOrdering(oldList,current, newList){
        if(oldList.length === 0) return newList
        else{

            let nextList = findWhere(oldList,{listId:current.listChild})
            let indexNextList = oldList.indexOf(nextList)

            if(oldList.length === 1){
                newList.push(nextList)
                this.setState({lists:newList})
            }else{
                oldList.splice(indexNextList,1)
                newList.push(nextList) 
                this.recursiveOrdering(oldList,nextList, newList) 
            }
               
        }
    }

    onDragEnd = (result) => {
        console.log(this.state.data)
        //retrieve source and destination data (given by dnd)
        //const { source, destination,draggableId } = result;
        //console.log(result)
        /*
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
        }*/


    };
    
    render() {  
        const {classes, lists, match} = this.props
        
        return (
            <div className={classes.projectBody}>
                
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Lists key="1" idProject={match.params.id} lists={this.orderList(lists)}  ></Lists>
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lists: state.project.lists
})

const mapDispatchToProps ={
    getAllLists: _action.projectAction.findAllLists,
    findAllCards: _action.listAction.findAllCards
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

