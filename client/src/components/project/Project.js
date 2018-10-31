import React, { Component } from 'react';
import { connect } from 'react-redux'
import _action from '../../actions'
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'
import { withStyles } from '@material-ui/core/styles';
import {findWhere, where} from 'underscore';




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
            if(headList){
                lists.splice(indexHead,1)
                this.recursiveOrdering(lists,headList,[headList])
            }else{
                this.setState({lists:this.props.lists,updateLists : true})
            }               
        }else{
            this.setState({lists:[],updateLists : true})
        }
  
    }


     recursiveOrdering(oldList,current, newList){
        
     
        if(oldList.length === 0) {
            this.setState({lists:newList,updateLists : true}); 
        }
        else{
            if(current){
                let nextList = findWhere(oldList,{listFather:current.listId})
                let indexNextList = oldList.indexOf(nextList)
                if(nextList){
                    if(oldList.length === 1){
                        newList.push(nextList)
                        this.setState({lists:newList,updateLists : true})
                    }else{
                        oldList.splice(indexNextList,1)
                        newList.push(nextList) 
                        this.recursiveOrdering(oldList,nextList, newList) 
                    }
                }else{
                    let nextList = oldList[0]

                    if(oldList.length === 1){
                        newList.push(nextList)
                        this.setState({lists:newList,updateLists : true})
                    }else{
                        oldList.splice(0,1)
                        newList.push(nextList) 
                        this.recursiveOrdering(oldList,nextList, newList) 
                    }
                }
                
            }else{
                this.setState({lists:this.props.lists,updateLists : true})
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
        const { destination,draggableId } = result;
        const {lists} = this.state
        
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if(result.type === 'LIST'){
            
           
           let findList = findWhere(lists,{listId: draggableId})
           let indexOfList = lists.indexOf(findList)

           
           let newLists = lists

            //remove list from list of list
            newLists.splice(indexOfList,1,)

            newLists.splice(destination.index,0,findList)
            
            this.setState({data:newLists})

            let updateList = findWhere(lists,{projectId: 1})
            
            let fatherOfUpdatedList = updateList.listFather === undefined ? null : updateList.listFather

            let childThatHadMeAsFather = findWhere(lists,{listFather: updateList.listId})
            

            let indexOfUpdateList = lists.indexOf(updateList)
            
            let listFather = lists[indexOfUpdateList-1] === undefined ? null : lists[indexOfUpdateList-1].listId
            let listChild = lists[indexOfUpdateList+1] === undefined ? null : lists[indexOfUpdateList+1].listId
            
            // action
            if(childThatHadMeAsFather) this.props.moveList(childThatHadMeAsFather.listId,fatherOfUpdatedList)
            if(updateList)  this.props.moveList(updateList.listId,listFather)
            if(listChild) this.props.moveList(listChild,updateList.listId)
            
            
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
                <div>

                </div>
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
    updateCard: _action.listAction.updateCard,
    getProject: _action.projectAction.getProjectInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

