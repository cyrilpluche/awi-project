import React, { Component } from 'react';
import Card from '../card/Card'
import { withStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import { styles } from './Style'

import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
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

import { Done} from '@material-ui/icons';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography/Typography";

const ITEM_HEIGHT = 38;

class ListPrello extends Component{
    constructor(props){
        super(props)
        this.state = {
            editListTitle : false,
            newListTitle:'',
            newCardTitle:'',
            isOpenAddCardDialog: false,
            anchorEl: null,
            isOpenDeleteDialog: false,
            open:false,

        }
        this.handleArchivedList = this.handleArchivedList.bind(this)
        this.handleEditTitle = this.handleEditTitle.bind(this)
        this.handleCloseDeleteListDialog = this.handleCloseDeleteListDialog.bind(this)
        this.handleConfirmDeleteList = this.handleConfirmDeleteList.bind(this)
    }



    createNewCard(){
        let cardName = this.state.newCardTitle
        let listId = this.props.list.listId
        let cardFather = this.props.list.CardListFks.length
        if(cardName) this.props.createCard(cardName,listId,this.props.idProject, this.props.member, cardFather)
    }



    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };


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

    /*===============Edit title ====================*/
    handleOpenMenu = name => event =>{
        this.setState({ [name]: true });
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });
    };

    handleEditTitle(){

        if(this.state.newListTitle) this.props.updateListTitle(this.state.newListTitle,this.props.list.listId)
        this.setState({editListTitle: false}, ()=>{
        })
    }


    /*============== Archived list ==============*/
    handleArchivedList (){
        const {list} = this.props
        this.handleCloseMenu()
        this.props.archiveList(list.listId,1)
    }



    render() {
        const {classes,list} = this.props
        const { editListTitle, anchorEl } = this.state;
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
                    {"Warning"}
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

        const MenuList = (
            <ListItemSecondaryAction>
                <IconButton
                    onClick={this.handleClickMenu}
                    aria-label="Comments"
                    size="small"
                    className={ classes.whiteText }
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

                    <MenuItem key="editListTitle"  onClick={this.handleOpenMenu('editListTitle')}>
                        Edit title
                    </MenuItem>
                    <MenuItem key="deleteList"  onClick={this.handleDeleteList}>
                        Delete
                    </MenuItem>
                    {confirmDeleteDialog}
                    <MenuItem key="archivedList"  onClick={this.handleArchivedList}>
                        Archived
                    </MenuItem>

                    ))}
                </Menu>
            </ListItemSecondaryAction>
        )


        return (
            <Draggable draggableId={"List:"+this.props.list.listId} index={this.props.index}>
                {(provided,snapshot) => {
                    return (
                        <div className={classes.list + ' ' + classes.borderRadius + ' ' + classes.borderRadiusBottom}
                             {...provided.draggableProps}
                             ref={provided.innerRef}
                        >
                            <List
                                component="nav"
                                disablePadding={true}
                                dense={true}
                                className={ classes.borderRadius }
                            >
                                <ListItem {...provided.dragHandleProps} className={classes.listTitle2 + ' ' + classes.borderRadius}>
                                    <ListItemText>
                                        {!editListTitle ?
                                            <Grid justify='flex-start' alignItems='center' container>
                                                <Badge
                                                    badgeContent={list.CardListFks ? list.CardListFks.filter(card => card.cardStatus === 0).length : 0}
                                                    className={classes.badge}
                                                    color='error'
                                                >
                                                    <p style={{color:'#155fa0'}}>p</p>
                                                </Badge>
                                                <Typography variant='overline' className={ classes.whiteText }>
                                                    {this.props.list.listTitle}
                                                </Typography>
                                                {MenuList}
                                            </Grid>
                                            :
                                            <Grid justify='flex-start' alignItems='center' container className={ classes.noPadding }>
                                                <Badge
                                                    badgeContent={list.CardListFks ? list.CardListFks.filter(card => card.cardStatus === 0).length : 0}
                                                    className={classes.badge}
                                                    color='error'
                                                />
                                                <Grid item xs={9} className={ classes.TexfieldGrid }>
                                                    <TextField
                                                        id="standard-bare"
                                                        className={classes.textField2}
                                                        defaultValue={list.listTitle}
                                                        margin="normal"
                                                        onChange={this.handleChange('newListTitle')}
                                                    />
                                                </Grid>
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        onClick={this.handleEditTitle}
                                                        aria-label="valid"
                                                        size="small"
                                                        className={ classes.validEditTitle }
                                                    >
                                                        <Done />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </Grid>
                                        }
                                    </ListItemText>

                                </ListItem>
                                <Droppable droppableId={this.props.list.listId+":"+this.props.list.listTitle} type="CARD">
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}

                                                className={classes.dropSpace + ' ' + classes.cardSlot} style={{flexGrow:1}} >

                                                {list.CardListFks.filter(card => card.cardStatus === 0 ).map((card,index) =>
                                                    <div key={index}>
                                                        <Card
                                                            key={card.cardId}
                                                            card={card}
                                                            listIndex={this.props.listIndex}
                                                            cardIndex={index}
                                                            index={index}
                                                            route={this.props.route}
                                                        />
                                                    </div>



                                                )}

                                                {provided.placeholder}

                                            </div>
                                        )}}
                                </Droppable>
                                <Grid container justify="space-between">
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            color='primary'
                                            size="small"
                                            className={classes.button + ' ' + classes.borderRadiusBottom}
                                            onClick={this.handleClickOpen}>
                                            <AddIcon /> new card
                                        </Button>
                                    </Grid>
                                </Grid>

                                <SimpleDialog
                                    type="card"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                />
                            </List>
                        </div>
                    )}
                }
            </Draggable>
        )
    }
}





export default withStyles(styles)(ListPrello)

