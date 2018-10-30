import React, { Component } from 'react';
import { connect } from 'react-redux'
import _action from '../../actions'
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'
import { withStyles } from '@material-ui/core/styles';
import {findWhere} from 'underscore';




const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`
    },
});




class Project extends Component {

    constructor(props){
        super(props)
        this.state = {
            lists : [],
            updateLists : false
        }
    }

    componentWillMount() {
        this.props.getAllLists(this.props.match.params.id)
        this.props.findAllCards()
        this.setState({lists : this.props.lists})
    }

   componentWillReceiveProps(){

        this.setState({updateLists : false})
    }

    componentDidUpdate(){

        if(!this.state.updateLists){
            this.orderList(this.props.lists)      
        } 
    }


   orderList(lists){
        if(lists.length !== 0){
            const headList = findWhere(lists,{listFather: null})
            const indexHead = lists.indexOf(headList)
            lists.splice(indexHead,1)
            this.recursiveOrdering(lists,headList,[headList])   
        }else{
            this.setState({lists:[]})
            this.setState({updateLists : true})
        }
  
    }


     recursiveOrdering(oldList,current, newList){

        if(oldList.length === 0) {
            this.setState({lists:newList}); 
            this.setState({updateLists : true})
        }
        else{

            let nextList = findWhere(oldList,{listFather:current.listId})
            let indexNextList = oldList.indexOf(nextList)

            if(oldList.length === 1){
                newList.push(nextList)
                this.setState({lists:newList})
                this.setState({updateLists : true})
            }else{
                oldList.splice(indexNextList,1)
                newList.push(nextList) 
                this.recursiveOrdering(oldList,nextList, newList) 
            }
               
        }
    }

    createNewList(listName,idProject){
        const {lists} = this.state
 
        if(lists.length === 0 ){
            this.props.createList(listName,idProject,null)
        }else{           
            let lastElement = lists[lists.length -1]
            this.props.createList(listName,idProject,lastElement.listId)
        } 
    }

    onDragEnd = (result) => {
        
        //retrieve source and destination data (given by dnd)
        const { source,destination,draggableId } = result;
        const {lists} = this.state
        
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if(result.type === 'LIST'){
            
            console.log(result)
           let findList = findWhere(lists,{listId: draggableId})
           let indexOfList = lists.indexOf(findList)

           
           let newLists = lists

            //remove list from list of list
            newLists.splice(indexOfList,1,)

            newLists.splice(destination.index,0,findList)
            
            this.setState({data:newLists})

            let updateList = findWhere(lists,{listId: draggableId})
            let fatherOfUpdatedList = updateList.listFather === undefined ? null : updateList.listFather

            let childThatHadMeAsFather = findWhere(lists,{listFather: updateList.listId})
            
            if(childThatHadMeAsFather !== undefined && childThatHadMeAsFather !== null ) this.props.moveList(childThatHadMeAsFather.listId,fatherOfUpdatedList)


            let indexOfUpdateList = lists.indexOf(updateList)
            
            let listFather = lists[indexOfUpdateList-1] === undefined ? null : lists[indexOfUpdateList-1].listId
            let listChild = lists[indexOfUpdateList+1] === undefined ? null : lists[indexOfUpdateList+1].listId
            
            // action
            if(updateList !== undefined && updateList !== null)  this.props.moveList(updateList.listId,listFather)
            if(listChild !== undefined  && listChild !== null) this.props.moveList(listChild,updateList.listId)
            
            
        }

        if (result.type === 'CARD') {
            console.log(result)
            let cardId = draggableId
            let findListId = findWhere(lists, {listTitle:destination.droppableId})
            this.props.updateCard(cardId,findListId.listId)
        }


    };
    
    render() {  
        const {classes, match} = this.props
        return (
            <div className={classes.projectBody}>
                
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Lists key="1" idProject={match.params.id} lists={this.state.lists}  createListCallback={this.createNewList.bind(this)} ></Lists>
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lists: state.project.lists,
})

const mapDispatchToProps ={
    getAllLists: _action.projectAction.findAllLists,
    findAllCards: _action.listAction.findAllCards,
    createList: _action.projectAction.createList,
    moveList: _action.projectAction.updateLists,
    updateCard: _action.listAction.updateCard
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

