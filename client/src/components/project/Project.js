import React, { Component } from 'react';
import { connect } from 'react-redux'

//Helpers and actions
import _action from '../../actions'
import _helper from '../../helpers'


// Drag and drop 
import { DragDropContext} from 'react-beautiful-dnd';
import {findWhere} from 'underscore';

// Components
import Lists from './list/Lists'
import ActivityList from '../ui/activity/ActivityList'
import Filter from '../ui/filter/Filter'


// Material Ui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import {RestorePage, Archive, SupervisorAccount,RemoveRedEye,FilterList,Description,Edit, Done} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import MemberDialog from '../ui/dialog/MemberDialog'
import VisibilityDialog from '../ui/dialog/VisibilityDialog'
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from "@material-ui/core/Divider/Divider";

// Styles
import {withStyles } from '@material-ui/core/styles';
import { styles } from './Style'

// Socket IO
import socket from '../../helpers/SocketIo.helper'





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
            openArchived:false,
            projectInfo:''
        }

        this.socket = socket
        this.handleRestoreArchived = this.handleRestoreArchived.bind(this)
        this.deleteList = this.deleteList.bind(this)
        this.updateListTitle = this.updateListTitle.bind(this)
        this.archiveList = this.archiveList.bind(this)
        this.createCard = this.createCard.bind(this)
        this.createNewList = this.createNewList.bind(this)

        this.socket.on('updateProject', this.socketUpdate.bind(this))



    }

    socketUpdate(lists){
         this.props.loadLists(lists)
     }

    componentWillMount() {
        const {match, currentMemberId, logged, getMemberHasProject, getProjectInfo,getAllListsWithCards, getMemberStatus,getActivity} = this.props

        this.socket.emit("subscribe", this.props.match.params.id)
        const projectId = this.props.match.params.id

        // Get project informations
        getProjectInfo(match.params.id)

        getMemberHasProject(logged.memberId, match.params.id)

        // Get all lists of this project with associated cards
        getAllListsWithCards(match.params.id)

        // Get all project members
        this.props.getAllMembers(this.props.match.params.id)

        // Verify if it's a project administrator
        getMemberStatus(match.params.id, currentMemberId)

        //Get all activity related to this project
        getActivity(match.params.id)

        //this.props.getLabels()
        this.props.onGetAllPermissions(projectId)

    }

    componentWillUnmount(){
        this.socket.emit("unsubscribe",this.props.match.params.id)
    }



    //Will set the state with props
    componentWillReceiveProps(){
        const {lists,members} = this.props

        this.setState({ updateLists : false,
            lists : lists,
            members : members,
        })
    }

    // When a change occurs on our props, we verify to change the state (re rendering) if necessary
    componentDidUpdate(prevProps){
        const {hasProject,projectInfo} = this.props

        // verify if props exist
        if(projectInfo){
            // If Logged user is not a member of the project & project is private
            if(hasProject === false && projectInfo.projectVisibility ===1)
            //redirect to home
                _helper.History.push('/home')
        }


        // If a change occurs on lists props
        if(this.props.lists !== prevProps.lists ){

            this.setState( {lists : this.props.lists},()=>{
            })
            // this.orderList(this.props.lists)
        }

        //If a change occurs on projectInfo
        if(this.props.projectInfo !== prevProps.projectInfo ){
            this.setState( {projectInfo : this.props.projectInfo})
        }
    }



    /**
     * Create a new List by calling the action "createList"
     * @param listName title of the new list
     * @param idProject project id associated to the new list
     */
    createNewList(listName,idProject){
        const {lists} = this.state


        //this.socket.emit('add',"new list")


        // if its the first list created for this project, the list has no father
        if(lists.length === 0 ){
            this.props.createList(listName,idProject,null)

            // we call creatList action specifying the title, project id and father list id.
        }else{
            let lastElement = lists[lists.length -1]
            this.props.createList(listName,idProject,lastElement.listId, this.props.currentMember)
        }

    }
    deleteList(listId,idProject){
        this.props.deleteList(listId,idProject)
    }

    updateListTitle(newListTitle,listId){
        this.props.updateListTitle(newListTitle,listId)
    }
    archiveList(listId){
        this.props.archiveList(listId,1)
    }

    /*============= CARD ACTIONS ======================*/
    createCard(cardName,listId,idProject){
        this.props.createCard(cardName,listId,idProject, this.props.currentMember)
    }







    /**
     * Will occurs when something has been dragged
     */
    onDragEnd = (result) => {

        //retrieve source and destination data (given by dnd)
        const { source, destination,draggableId } = result;
        //retrieve lists
        const {lists} = this.state
        const notArchivedList = Array.from(lists.filter(list => list.listStatus === 0))
        const archivedList = Array.from(lists.filter(list => list.listStatus === 1))

        // dropped outside the droppagble area
        if (!destination) {
            return;
        }


        //When a list has been dragged and dropped
        if(result.type === 'LIST'){

            let dragId = draggableId.split(':');
            dragId = Number.parseInt(dragId[1])
            let findList = notArchivedList.find(list => list.listId === dragId)

            let indexOfList = notArchivedList.indexOf(findList)
            let newLists = Array.from(notArchivedList)

            //remove list from list of list
            newLists.splice(indexOfList,1,)

            //Insert list in new index
            newLists.splice(destination.index,0,findList)

            const newArrayList = newLists.concat(archivedList)

            this.props.updatePositionLists(newArrayList)
            //set state with the new list           
            this.setState({lists:newArrayList},() =>{

                //this.socket.emit('move', newArrayList)
                //let updateList = lists.find(list => list.listId === dragId)
                //let updateList = findWhere(lists,{listId: dragId})

                let fatherOfUpdatedList = findList.listFather === undefined ? null : findList.listFather

                let childUpdatedList = findWhere(lists,{listFather: findList.listId})


                let indexOfUpdateList = lists.indexOf(findList)

                //New father and child of dragged list
                let listFather = lists[indexOfUpdateList-1] === undefined ? null : lists[indexOfUpdateList-1].listId
                let listChild = lists[indexOfUpdateList+1] === undefined ? null : lists[indexOfUpdateList+1].listId


                // Change fathers of list in DB
                /* if(childUpdatedList) this.props.moveList(childUpdatedList.listId,fatherOfUpdatedList)
                 if(findList)  this.props.moveList(updateList.listId,listFather)
                 if(listChild) this.props.moveList(listChild,updateList.listId)*/
            })
        }

        // When a card has been dragged and dropped
        if (result.type === 'CARD') {

            let sourceListId =  Number.parseInt(source.droppableId.split(':')[0])
            let sourceList = Object.assign({},lists.find(list => list.listId === sourceListId ))

            let destinationListId = Number.parseInt(destination.droppableId.split(':')[0])
            let destinationList =  Object.assign({},lists.find(list => list.listId === destinationListId ))

            let draggedCard = sourceList.CardListFks.find(card => card.cardId === draggableId )

            if(destinationListId !== sourceListId){

                const notArchivedCardsSource = Array.from(sourceList.CardListFks.filter(card => card.cardStatus === 0))
                const archivedCardsSource = Array.from(sourceList.CardListFks.filter(card => card.cardStatus === 1))

                let deleteSourceList = Array.from(notArchivedCardsSource)
                deleteSourceList.splice(source.index,1,)


                const notArchivedCardsDestination = Array.from(destinationList.CardListFks.filter(card => card.cardStatus === 0))
                const archivedCardsDestination = Array.from(destinationList.CardListFks.filter(card => card.cardStatus === 1))

                let addDestinationList = Array.from(notArchivedCardsDestination)
                addDestinationList.splice(destination.index,0,draggedCard)

                sourceList.CardListFks = deleteSourceList.concat(archivedCardsSource)
                destinationList.CardListFks = addDestinationList.concat(archivedCardsDestination)

                let sourceListIndex = lists.findIndex(list => list.listId === sourceList.listId )
                let destinationListIndex = lists.findIndex(list => list.listId === destinationList.listId )

                let newList = Array.from(lists)
                newList.splice(sourceListIndex,1,)
                newList.splice(sourceListIndex,0,sourceList)
                newList.splice(destinationListIndex,1,)
                newList.splice(destinationListIndex,0,destinationList)

                this.setState({lists: newList}, () =>{
                    //this.socket.emit('move', newList)
                    this.props.updateCard(draggedCard.cardId, destinationList.listId,newList)
                })


            }
            else{

                const notArchivedCardsSource = Array.from(sourceList.CardListFks.filter(card => card.cardStatus === 0))
                const archivedCardsSource = Array.from(sourceList.CardListFks.filter(card => card.cardStatus === 1))

                let newSourceList = Array.from(notArchivedCardsSource)
                newSourceList.splice(source.index,1,)
                newSourceList.splice(destination.index,0,draggedCard)

                sourceList.CardListFks = newSourceList.concat(archivedCardsSource)

                let sourceListIndex = lists.findIndex(list => list.listId === sourceList.listId )

                let newList = Array.from(lists)

                newList.splice(sourceListIndex,1,)
                newList.splice(sourceListIndex,0, sourceList)
                console.log(newList)
                this.setState({lists: newList}, () =>{
                    this.props.updatePositionLists(newList)
                    // this.socket.emit('move', newList)
                })


            }



            // this.props.updateCard(cardId,findListId.listId)}*/

        }

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

    handleRestoreArchived = (name,type) => event =>{

        if(type === "list") {

            this.props.restoreList(name,0)
        }
        if(type === "card") {

            this.props.restoreCard(name,{cardStatus:0})
        }
        //this.toggleDrawer('openArchived', false)
    }

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
                    <div className={classes.drawerList}>
                        <ActivityList activities={this.props.activities}/>
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
                        <Filter projectInfo={projectInfo}/>
                    </div>
                </div>
            </Drawer>
        );

        /* ================= ARCHIVED DRAWER================= */
        const renderArchived = (
            <Drawer
                anchor="right"
                open={this.state.openArchived}
                onClose={this.toggleDrawer('openArchived', false)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer('openArchived', false)}
                >
                    <Grid alignItems='center' justify='center' container >
                        <Grid xs={2} item>
                            <IconButton
                                onClick={this.toggleDrawer('openArchived', false)}
                                color="inherit"
                            >
                                <ChevronLeftIcon color='primary' />
                            </IconButton>
                        </Grid>
                        <Grid xs={8} item>
                            <Button fullWidth color="primary" className={classes.drawer}>
                                Archived
                            </Button>
                        </Grid>
                        <Grid xs={2} item>
                        </Grid>
                        <div className={classes.expandPanel}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Lists</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid key={1} xs={12} item>
                                        {this.props.lists ? this.props.lists.filter(list => list.listStatus === 1).map((list,index) =>

                                            <Paper key={index} className={classes.paper}>
                                                <Grid alignItems='center' justify="space-between" wrap="nowrap" container >
                                                    <Grid xs={10} item>
                                                        {list.listTitle}
                                                    </Grid>
                                                    <Grid xs={2} item>
                                                        <IconButton size="small" aria-label="valid" className={classes.restoreButton} onClick={this.handleRestoreArchived(list.listId,"list")}>
                                                            <RestorePage fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                        ): <Paper className={classes.paper}> 0 list archived</Paper>}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Cards</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid key={1} xs={12} item>
                                        {this.props.lists ? this.props.lists.map((list,index) => list.CardListFks.filter((card,index) => card.cardStatus === 1).map(card =>
                                                <Paper key={index+card.cardId} className={classes.paper}>
                                                    <Grid alignItems='center' justify="space-between" wrap="nowrap" container >
                                                        <Grid xs={10} item>
                                                            {card.cardTitle}
                                                        </Grid>
                                                        <Grid xs={2} item>
                                                            <IconButton size="small" aria-label="valid" className={classes.restoreButton}  onClick={this.handleRestoreArchived(card,"card")}>
                                                                <RestorePage fontSize="small" />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            )
                                        ): <Paper className={classes.paper}> 0 card archived</Paper>}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
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

                    {/**===================  MEMBERS BUTTON  ========================================= */}
                    <Button color="primary" className={classes.button} onClick={this.handleClickOpen}>
                        <SupervisorAccount className={classes.leftIcon} />
                        {this.props.members? this.props.members.length : 0} Members
                    </Button>
                    <MemberDialog  isAdmin={this.props.isAdmin} open={this.state.openMemberDialog} onClose={this.handleClose.bind(this)} />

                    {/**===================  VISIBILITY BUTTON  ========================================= */}
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

                    {/*===================  ARCHIVED BUTTON  ========================================= */}
                    < Button color="primary" className={classes.button} onClick={this.toggleDrawer('openArchived', true)}>
                        <Archive className={classes.leftIcon} />
                        Archived
                    </Button>
                    {renderArchived}
                </Grid>
            </Grid>
        );

        const dndArea = (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Lists key="1"
                       idProject={match.params.id}
                       lists={this.state.lists}
                       member={this.props.currentMember}
                       createListCallback={this.createNewList}
                       deleteList = {this.deleteList}
                       updateListTitle = {this.updateListTitle}
                       archiveList = {this.archiveList}
                       createCard = {this.createCard}
                       route = {match}
                />
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
    currentMember: state.signin.member,
    isAdmin: state.project.isAdmin || false,
    logged: state.signin.member,
    hasProject : state.project.loggedHasProject,
    activities: state.project.activities,
    currentMemberId: state.signin.member.memberId
    //labels : state.project.labels || []
})

const mapDispatchToProps ={
    getAllListsWithCards: _action.projectAction.findAllLists,
    createList: _action.projectAction.createList,
    moveList: _action.projectAction.updateLists,
    updateCard: _action.listAction.updateCard,
    updateCardsPosition : _action.listAction.updateCardPosition,
    getProjectInfo: _action.projectAction.getProjectInfo,
    updateTitle: _action.projectAction.updateProjectTitle,
    getAllMembers : _action.projectAction.findAllMembers,
    getMemberStatus:  _action.projectAction.getMemberStatus,
    getActivity: _action.projectAction.getActivity,
    getMemberHasProject : _action.projectAction.getMemberHasProject,
    onGetAllPermissions: _action.projectAction.getAllPermissions,
    restoreList: _action.listAction.updateListStatus,
    restoreCard : _action.listAction.restoreCard,
    updatePositionLists: _action.listAction.updatePositionLists,
    createCard: _action.listAction.createCard,
    updateListTitle: _action.listAction.updateListTitle,
    deleteList: _action.listAction.deleteList,
    archiveList: _action.listAction.updateListStatus,
    loadLists:  _action.projectAction.loadLists
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

