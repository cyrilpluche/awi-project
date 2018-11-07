import React, { Component } from 'react';
import Card from '../card/Card'
import { withStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import { styles } from './Style'
import { connect } from 'react-redux'
import _action from '../../../actions'

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ITEM_HEIGHT = 28;

class ListPrello extends Component{
    constructor(props){
        super(props)
        this.state = {
            editListTitle : false,
            newListTitle:'',
            newCardTitle:'',
            isOpenAddCardDialog: false,
            anchorEl: null,
            cards: [],
            isOpenDeleteDialog: false,
            open:false
        }

       // this.handleEditTitle = this.handleEditTitle.bind(this)
       // this.handleValidationEditTitle = this.handleValidationEditTitle.bind(this)
        this.handleCloseDeleteListDialog = this.handleCloseDeleteListDialog.bind(this)
        this.handleConfirmDeleteList = this.handleConfirmDeleteList.bind(this)
    }


    createNewCard(){
        let cardName = this.state.newCardTitle
        let listId = this.props.list.listId
        console.log(this.props.idProject)
        if(cardName) this.props.createCard(cardName,listId,this.props.idProject)
        
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };

    handleEditTitle(){
        //this.setState({editListTitle:true})
        this.handleCloseEditMenu()
    }

    handleClose = (value) => {
        this.setState({ newCardTitle: value, open: false }, function(){  this.createNewCard()});
       
    };

    handleClickMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleCloseMenu = () => {
        this.setState({ anchorEl: null });
      };
    
      /* =============DELETE LIST ================= */
      handleDeleteList = () =>{

        this.setState({ isOpenDeleteDialog: true });
      }
      
      handleCloseDeleteListDialog(){

        this.setState({ isOpenDeleteDialog: false });
      }

      handleConfirmDeleteList(){

        const {list, idProject} = this.props
        this.props.deleteList(list.listId,idProject)
      }
      


    render() {
        const {classes, list,idProject} = this.props
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        

        const confirmDeleteDialog = (
            <Dialog
                open={this.state.isOpenDeleteDialog}
                keepMounted
                onClose={this.handleCloseDeleteListDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Attention"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this list ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDeleteListDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleConfirmDeleteList} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        )

        const EditTitle = (
            <div>
                <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClickMenu}
                size="small"
                >
                <MoreVertIcon />
                    </IconButton>
                <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleCloseMenu}
                PaperProps={{
                    style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                    },
                }}
                >
                
                    <MenuItem key="editListTitle"  onClick={this.handleCloseMenu}>
                        Edit title
                    </MenuItem>
                    <MenuItem key="deleteList"  onClick={this.handleDeleteList}>
                        Delete
                    </MenuItem>
                    {confirmDeleteDialog}
                    <MenuItem key="archivedList"  onClick={this.handleCloseMenu}>
                        Archived
                    </MenuItem>
                ))}
                </Menu>
            </div>
        )


        return (
            <Draggable draggableId={"List:"+this.props.list.listId} index={this.props.index}>
                {(provided,snapshot) => {
                    const style = {
                        backgroundColor: '#eeeeee',
                        fontSize: 18,
                        ...provided.draggableProps.style,
                    };
                    return (
                    <div className={classes.list} 
                        {...provided.draggableProps}
                        style={style}
                        ref={provided.innerRef}
                    >
                    <List
                        component="nav"
                        subheader={
                        <ListSubheader component="div"  {...provided.dragHandleProps} className={classes.listTitle}>
                            <Grid container justify="space-between" alignItems="center" wrap="nowrap" spacing={16}>
                                <Grid item xs={11}>
                                    {this.props.list.listTitle}
                                </Grid>
                                <Grid item xs={1}>
                                    <Badge badgeContent={list.CardListFks ? list.CardListFks.length : 0} color="primary" className={classes.badge}>
                                        <div></div>
                                    </Badge> 
                                </Grid>                              
                            </Grid>
                        </ListSubheader>}
                        >
                           
                        <Droppable droppableId={this.props.list.listId+":"+this.props.list.listTitle} type="CARD">
                            {(provided,snapshot) => {
                                const style = {
                                    //backgroundColor: '#e4e4e4',
                                    ...provided.droppableProps.style,
                                };
                                return (
                                    <div 
                                    ref={provided.innerRef} 
                                    
                                    className={classes.dropSpace} style={{backgroundColor:'#ffff',flexGrow:1}}>
                                      {list.CardListFks ? list.CardListFks.map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ):'' }
                                       
                                    {provided.placeholder}
                                    
                                    </div>
                            )}}
                        </Droppable>
                            <Grid container justify="space-between">
                                <Grid item xs={10}>
                                    <Button size="small" className={classes.button} onClick={this.handleClickOpen}>
                                        <AddIcon /> add a new card
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    {EditTitle}
                                </Grid>
                            </Grid>

                        <SimpleDialog
                            type="card"
                            open={this.state.open}
                            onClose={this.handleClose}
                        />
                    </List>
                    </div>
                )}}           
            </Draggable>   
        )
    }
}

const mapStateToProps = (state) => ({
    cards: state.project.cards
})

const mapDispatchToProps ={
    createCard: _action.listAction.createCard,   
    //updateTitle: _action.listAction.updateListTitle,
    deleteList: _action.listAction.deleteList,
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ListPrello))

