import React, { Component } from 'react';
import { connect } from 'react-redux'
import _action from '../../actions'
import { DragDropContext} from 'react-beautiful-dnd';
import Lists from './list/Lists'
import {findWhere} from 'underscore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import { styles } from './Style'
import { Button } from '@material-ui/core';
import { SupervisorAccount,RemoveRedEye,FilterList,Description,Edit, Done} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import MemberDialog from '../ui/dialog/MemberDialog'





class Project extends Component {

    constructor(props){
        super(props)
        this.state = {
            lists : [],
            updateLists : false,
            editProjectTitle : false,
            newProjectTitle : '',
            openMemberDialog:false
        }
    }

    componentWillMount() {
        this.props.getProjectInfo(this.props.match.params.id)
        this.props.getAllLists(this.props.match.params.id)
        // this.props.getAllMembers(this.props.match.params.id)
        this.props.findAllCards()
        this.setState({lists : this.props.lists})
    }


    componentWillReceiveProps(){
        this.setState({updateLists : false, lists : this.props.lists})
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

    handleClose (){
        this.setState({ openMemberDialog: false });
       
    };
    
    render() {  
        const {classes, match, projectInfo } = this.props
        return (
            <div className={classes.projectBody}>
                    <Grid container spacing={16} className={classes.projectHeader}>
                        <Typography variant="h5" gutterBottom className={classes.projectTitle}>
                            {this.state.editProjectTitle === false ? <div>{projectInfo? projectInfo.projectTitle : ''}
                                <Edit className={classes.rightIcon} onClick={this.handleEditTitle.bind(this)} fontSize="small" />
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
                       < Button color="primary" className={classes.button} onClick={this.handleClickOpen}>
                            <SupervisorAccount className={classes.leftIcon} />
                            0 Members
                        </Button>
                        <MemberDialog type="card" open={this.state.openMemberDialog} onClose={this.handleClose.bind(this)}/>
                        < Button color="primary" className={classes.button}>
                            <RemoveRedEye className={classes.leftIcon} />
                            Visibility
                        </Button>
                        < Button color="primary" className={classes.button}>
                            <FilterList className={classes.leftIcon} />
                            Activities
                        </Button>
                        < Button color="primary" className={classes.button}>
                            <Description className={classes.leftIcon} />
                            Filter
                        </Button>
                        </Grid>
                    </Grid>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Lists key="1" idProject={match.params.id} lists={this.state.lists}  createListCallback={this.createNewList.bind(this)} ></Lists>
                    </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lists: state.project.lists,
    projectInfo : state.project.projectInfo
})

const mapDispatchToProps ={
    getAllLists: _action.projectAction.findAllLists,
    findAllCards: _action.listAction.findAllCards,
    createList: _action.projectAction.createList,
    moveList: _action.projectAction.updateLists,
    updateCard: _action.listAction.updateCard,
    getProjectInfo: _action.projectAction.getProjectInfo,
    updateTitle: _action.projectAction.updateProjectTitle,
    getAllMembers : _action.projectAction.findAllMembers,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Project))

