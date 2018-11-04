import React, { Component } from 'react';
import { connect } from 'react-redux'

import _action from '../../actions'

// Drag and drop 
import { DragDropContext} from 'react-beautiful-dnd';
import {findWhere} from 'underscore';

//Components
import Lists from './list/Lists'
import ActivityList from '../ui/activity/ActivityList'
import Filter from '../ui/filter/Filter'

//Material Ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import {SupervisorAccount,RemoveRedEye,FilterList,Description,Edit, Done} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import MemberDialog from '../ui/dialog/MemberDialog'
import VisibilityDialog from '../ui/dialog/VisibilityDialog'
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

//Styles
import {withStyles } from '@material-ui/core/styles';
import { styles } from './Style'

//Socket IO
import SocketIOClient  from "socket.io-client"


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


class Project extends Component {

    constructor(props){
        super(props)
        this.state = {
            lists : [],
            updateLists : false,
            editProjectTitle : false,
            newProjectTitle : '',
            openMemberDialog:false,
            openVisibilityDialog:false,
            members:[],
            openActivity:false,
            openFilter:false,
            projectInfo:''
        }

        this.socket = SocketIOClient("http://localhost:4200")
        this.socket.on('addList', this.socketNewList.bind(this))
        this.socket.on('moveList', this.socketMoveList.bind(this))
    }

    socketNewList(msg){
        this.props.getAllListsWithCards(this.props.match.params.id)
    }

    socketMoveList(newLists){
        console.log(newLists)
       this.setState({lists:newLists})
    }

    componentWillMount() {
        // Get project informations
        this.props.getProjectInfo(this.props.match.params.id)

        // Get all lists of this project with associated cards
        this.props.getAllListsWithCards(this.props.match.params.id)

        // Get all project members 
        this.props.getAllMembers(this.props.match.params.id)

        // Verify if it's a project administrator
        this.props.getMemberStatus(this.props.match.params.id,/*memberLoggedId*/)

        //Get all activity related to this project
        this.props.getActivity(this.props.match.params.id)

        //this.props.getLabels()

        //Not needed 
        this.props.findAllCards()
    }
    

    
    //Will set the state with props
    componentWillReceiveProps(){
            this.setState({ updateLists : false, 
                lists : this.props.lists,
                members : this.props.members,
            })
    }

    // When a change occurs on our props, we verify to change the state (re rendering) if necessary
    componentDidUpdate(prevProps){

        // If a change occurs on lists props
        if(this.props.lists !== prevProps.lists ){
            this.setState( {lists : this.props.lists})
           // this.orderList(this.props.lists)      
        }
        
        //If a change occurs on projectInfo
        if(this.props.projectInfo !== prevProps.projectInfo ){
            this.setState( {projectInfo : this.props.projectInfo})
        }
    }



   /*orderList(lists){
        
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
  
    }*/


    /* recursiveOrdering(oldList,current, newList){
        
     
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
     }*/


    /**
     * Create a new List by calling the action "createList"
     * @param listName title of the new list
     * @param idProject project id associated to the new list
     */
    createNewList(listName,idProject){
        const {lists} = this.state
        const exist = findWhere(lists,{listTitle:listName})

        this.socket.emit('addList',"new card")
        // We can't create 2 list with the same name
        if(!exist){

            // if its the first list created for this project, the list has no father
            if(lists.length === 0 ){
                this.props.createList(listName,idProject,null)

            // we call creatList action specifying the title, project id and father list id.
            }else{           
                let lastElement = lists[lists.length -1]
                this.props.createList(listName,idProject,lastElement.listId)
            } 
        }
    }




    /**
     * Will occurs when something has been dragged 
     */
    onDragEnd = (result) => {
        
        //retrieve source and destination data (given by dnd)
        const { source, destination,draggableId } = result;

        //retrieve lists
        const {lists} = this.state
        
        
        // dropped outside the droppagble area
        if (!destination) {
            return;
        }


        //When a list has been dragged and dropped
        if(result.type === 'LIST'){
            
            
           let findList = findWhere(lists,{listId: draggableId})
           let indexOfList = lists.indexOf(findList)           
           let newLists = lists

            //remove list from list of list
            newLists.splice(indexOfList,1,)

            //Insert list in new index
            newLists.splice(destination.index,0,findList)
           
            //set state with the new list
            this.socket.emit('moveList', newLists)
            this.setState({lists:newLists},function(){


                let updateList = findWhere(lists,{listId: draggableId})

                let fatherOfUpdatedList = findList.listFather === undefined ? null : findList.listFather

                let childUpdatedList = findWhere(lists,{listFather: findList.listId})
                

                let indexOfUpdateList = lists.indexOf(findList)
                
                //New father and child of dragged list
                let listFather = lists[indexOfUpdateList-1] === undefined ? null : lists[indexOfUpdateList-1].listId
                let listChild = lists[indexOfUpdateList+1] === undefined ? null : lists[indexOfUpdateList+1].listId
                
                // Change fathers of list in DB
                if(childUpdatedList) this.props.moveList(childUpdatedList.listId,fatherOfUpdatedList)
                if(findList)  this.props.moveList(updateList.listId,listFather)
                if(listChild) this.props.moveList(listChild,updateList.listId)
            })
        }
        /*
        // When a card has been dragged and dropped
        if (result.type === 'CARD') {
           console.log(source)
           console.log(destination)
           let updatedList = Array.from(lists)
           
            if(source.droppableId === destination.droppableId){
                const newLists = reorder(
                    findWhere(lists, {listTitle : source.droppableId}).cards,
                    source.index,
                    destination.index
                );
                console.log(newLists)
                let sourceList = findWhere(updatedList, {listTitle:source.droppableId})
                let sourceListIndex = updatedList.indexOf(sourceList)
                console.log(sourceListIndex)
                console.log(updatedList)
                updatedList[sourceListIndex].cards = newLists
                console.log(updatedList)
                this.setState({lists: updatedList})

            }/*
            else{

                const newLists = move(
                    findWhere(updatedList, {listTitle : source.droppableId}).cards,
                    findWhere(updatedList, {listTitle : destination.droppableId}).cards,
                    source,
                    destination
                );

                let sourceList = findWhere(updatedList, {listTitle:source.droppableId})
                let sourceListIndex = updatedList.indexOf(sourceList)

                let destinationList = findWhere(updatedList, {listTitle:destination.droppableId})
                let destinationListIndex = updatedList.indexOf(destinationList)
                
                console.log(newLists)
                console.log(newLists[source.droppableId])
                updatedList[destinationListIndex].cards = newLists[destination.droppableId]
                this.setState({lists : updatedList})
                updatedList[sourceListIndex].cards = newLists[source.droppableId]
                

                console.log(updatedList)
                
                
            }

           // this.props.updateCard(cardId,findListId.listId)
    }*/


    };

    handleEditTitle(){
        this.setState({editProjectTitle:true})
    }

    handleValidationEditTitle(){
        this.setState({editProjectTitle:false})
        const {newProjectTitle} = this.state
        // update Project title 
        if(newProjectTitle) this.props.updateTitle(newProjectTitle, this.props.match.params.id)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });   
    };

    handleClickOpen = () => {
        this.setState({
            openMemberDialog: true,
        });
    };

    handleClickOpenVisibility= () => {
        this.setState({
            openVisibilityDialog: true,
        });
    };

    handleClose (){
        this.setState({ openMemberDialog: false,openVisibilityDialog:false });     
    };

    // Open/Close the left side drawer (for filter and activity)
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    
    render() {  
        const {classes, match, projectInfo } = this.props

        /* ================= ACTIVITY DRAWER================= */
        const renderActivity = (
            <Drawer
                anchor="right"
                open={this.state.openActivity} 
                onClose={this.toggleDrawer('openActivity', false)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer('openActivity', false)}
                >
                    <Grid alignItems='center' justify='center' container >
                        <Grid xs={2} item>
                            <IconButton
                                onClick={this.toggleDrawer('openActivity', false)}
                                color="inherit"
                            >
                                <ChevronLeftIcon color='primary' />
                            </IconButton>
                        </Grid>
                        <Grid xs={8} item>
                            <Button fullWidth color="primary" className={classes.drawer}>
                                Activity
                            </Button>
                        </Grid>
                        <Grid xs={2} item>
                        </Grid>
                    </Grid>
                    <div>
                        <ActivityList activities={null}></ActivityList>
                    </div>
                </div>
            </Drawer>
        );

         /* ================= FILTER DRAWER================= */
         const renderFilter = (
            <Drawer
                anchor="right"
                open={this.state.openFilter} 
                onClose={this.toggleDrawer('openFilter', false)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer('openFilter', false)}
                >
                    <Grid alignItems='center' justify='center' container >
                        <Grid xs={2} item>
                            <IconButton
                                onClick={this.toggleDrawer('openFilter', false)}
                                color="inherit"
                            >
                                <ChevronLeftIcon color='primary' />
                            </IconButton>
                        </Grid>
                        <Grid xs={8} item>
                            <Button fullWidth color="primary" className={classes.drawer}>
                                Filter
                            </Button>
                        </Grid>
                        <Grid xs={2} item>
                        </Grid>
                    </Grid>
                    <div>
                        <Filter projectInfo={projectInfo}></Filter>
                    </div>
                </div>
            </Drawer>
        );

        const header =(
            <Grid container spacing={16} className={classes.projectHeader}>

                {/*===================  TITLE EDIT  ========================================= */}
                <Typography variant="h5" gutterBottom className={classes.projectTitle}>
                    {this.state.editProjectTitle === false ? <div>{projectInfo? projectInfo.projectTitle : ''}
                        {this.props.isAdmin === true ?<Edit className={classes.rightIcon} onClick={this.handleEditTitle.bind(this)} fontSize="small" />:''}
                    </div>:
                    <div>
                        <TextField
                        id="standard-name"
                        label="Project title"
                        defaultValue={projectInfo.projectTitle}
                        onChange={this.handleChange('newProjectTitle')}
                        className={classes.textField}
                        margin="normal"
                        />
                        <Button color="primary" className={classes.button}>
                            <Done className={classes.validIcon} onClick={this.handleValidationEditTitle.bind(this)} />
                        </Button>
                    </div>}
                </Typography>
                <Grid container spacing={24} >

                {/*===================  MEMBERS BUTTON  ========================================= */}
               <Button color="primary" className={classes.button} onClick={this.handleClickOpen}>
                    <SupervisorAccount className={classes.leftIcon} />
                    {this.props.members? this.props.members.length : 0} Members
                </Button>
                <MemberDialog  isAdmin={this.props.isAdmin} members={this.props.members} open={this.state.openMemberDialog} onClose={this.handleClose.bind(this)} />
                
                {/*===================  VISIBILITY BUTTON  ========================================= */}
                < Button color="primary" className={classes.button} onClick={this.handleClickOpenVisibility}>
                    <RemoveRedEye className={classes.leftIcon} />
                    Visibility
                </Button>
                <VisibilityDialog isAdmin={this.props.isAdmin} open={this.state.openVisibilityDialog} onClose={this.handleClose.bind(this)}/>
                
                {/*===================  ACTIVITY BUTTON  ========================================= */}
                < Button color="primary" className={classes.button} onClick={this.toggleDrawer('openActivity', true)}>
                    <Description className={classes.leftIcon} />
                    Activity
                </Button>
                {renderActivity}

                 {/*===================  FILTER BUTTON  ========================================= */}
                < Button color="primary" className={classes.button} onClick={this.toggleDrawer('openFilter', true)}>
                    <FilterList className={classes.leftIcon} />
                    Filter
                </Button>
                {renderFilter}
               


                </Grid>
            </Grid>
            );

        const dndArea = (
            <DragDropContext onDragEnd={this.onDragEnd}>
                        <Lists key="1" idProject={match.params.id} lists={this.state.lists}  createListCallback={this.createNewList.bind(this)} ></Lists>
            </DragDropContext>
        )

        return (
            <div className={classes.projectBody}>
                    {header}
                    {dndArea}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lists: state.project.lists,
    projectInfo : state.project.projectInfo,
    members : state.project.members || [],
    isAdmin: state.project.isAdmin || false,
    //labels : state.project.labels || []
})

const mapDispatchToProps ={
    getAllListsWithCards: _action.projectAction.findAllLists,
    findAllCards: _action.listAction.findAllCards,
    createList: _action.projectAction.createList,
    moveList: _action.projectAction.updateLists,
    updateCard: _action.listAction.updateCard,
    getProjectInfo: _action.projectAction.getProjectInfo,
    updateTitle: _action.projectAction.updateProjectTitle,
    getAllMembers : _action.projectAction.findAllMembers,
    getMemberStatus:  _action.projectAction.getMemberStatus,
    getActivity: _action.projectAction.getActivity,
    //getLabels :  _action.projectAction.getLabels,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

