import React, { Component } from 'react';
import Card from '../card/Card'
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import { styles } from './Style'
import { connect } from 'react-redux'
import _action from '../../../actions'
import classNames from 'classnames';

// Material-ui import
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Done} from '@material-ui/icons';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ITEM_HEIGHT = 48;

class Listboard extends Component{
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
        }

        this.handleEditTitle = this.handleEditTitle.bind(this)
        this.handleValidationEditTitle = this.handleValidationEditTitle.bind(this)
        this.handleCloseDeleteListDialog = this.handleCloseDeleteListDialog.bind(this)
        this.handleConfirmDeleteList = this.handleConfirmDeleteList.bind(this)

    }

    createNewCard(){
        let cardName = this.state.newCardTitle
        let listId = this.props.list.listId
        if(cardName) this.props.createCard(cardName,listId)

    }

    handleCloseAddCardDialog = (value) => {
        this.setState({ newCardTitle: value, isOpenAddCardDialog: false }, function(){  this.createNewCard()});

    };

    handleCloseDeleteListDialog(){
        this.setState({
            isOpenDeletedDialog: false
        })
        this.handleCloseEditMenu()
    }

    handleConfirmDeleteList(){
        this.handleCloseDeleteListDialog()
        let listId = this.props.list.listId
        let projectId = this.props.list.projectId
        this.props.deleteList(listId, projectId)
    }

    handleOpenEditMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseEditMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleEditTitle(){
        this.setState({editListTitle:true})
        this.handleCloseEditMenu()
    }

    handleValidationEditTitle(){
        this.setState({editListTitle:false})
        const {newListTitle} = this.state
        // update List title
        if(newListTitle) this.props.updateTitle(newListTitle, this.props.list.listId, this.props.list.projectId)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleOpen = name => target => {
        this.setState({
            [name]: true,
        });
    };

    render() {
        const {classes,cards, list} = this.props;
        const { anchorEl, isOpenDeleteDialog } = this.state;
        const isOpenEditMenu = Boolean(anchorEl);

        const confirmDeleteDialog = (
            <Dialog
                open={isOpenDeleteDialog}
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
                        Etes-vous sûr de vouloir supprimer la liste?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDeleteListDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={this.handleConfirmDeleteList} color="primary">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        )

        const EditMenu = (
            <div className={classNames(classes.button, classes.rowRight)}>
                <Button
                    aria-label="More"
                    aria-owns={isOpenEditMenu ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    size="small"
                    className={classNames(classes.button, classes.rowRight)}
                    onClick={this.handleOpenEditMenu}
                >
                    <MoreVertIcon/>
                </Button>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={isOpenEditMenu}
                    onClose={this.handleCloseEditMenu}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleEditTitle}>Modifier le titre</MenuItem>
                    <MenuItem onClick={this.handleOpen('isOpenDeleteDialog')}>Supprimer la liste</MenuItem>
                    {confirmDeleteDialog}

                </Menu>
            </div>
        );

        return (
            <Draggable draggableId={this.props.list.listId} index={this.props.index}>
                {(provided) =>(
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <List className={classes.list}

                             component="nav"
                             subheader={
                                 <ListSubheader
                                     className={classes.listTitle}
                                     component="div"
                                     {...provided.dragHandleProps}
                                 >
                                     {this.state.editListTitle === false ? <div><b>{list? list.listTitle : ''}
                                         </b>
                                         {EditMenu}
                                         </div>
                                         :
                                         <div>
                                             <TextField
                                                 id="standard-name"
                                                 defaultValue={list.listTitle}
                                                 onChange={this.handleChange('newListTitle')}
                                                 className={classes.textField}
                                                 margin="normal"
                                             />
                                             <Button color="primary" className={classes.button}>
                                                 <Done className={classes.validIcon} onClick={this.handleValidationEditTitle} />
                                             </Button>
                                         </div>}

                                 </ListSubheader>}
                        >

                            <SimpleDialog
                                type="card"
                                open={this.state.isOpenAddCardDialog}
                                onClose={this.handleCloseAddCardDialog}
                            />
                            <Droppable droppableId={this.props.list.listTitle} type="CARD">
                                {(provided) =>(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={classes.dropSpace}>
                                        {cards.filter(card => card.listId === list.listId).map((card,index) =>
                                            <ListItem button className={classes.listItem}>
                                                <Card key={card.cardId} card={card} index={index}></Card>
                                            </ListItem>
                                        ) }

                                        {provided.placeholder}

                                    </div>
                                )}
                            </Droppable>
                            <ListItem button onClick={this.handleOpen('isOpenAddCardDialog')} className={classes.listItem}>
                                <ListItemText inset primary="+ Add a new card" />
                            </ListItem>


                        </List>
                    </div>
                )}
            </Draggable>
        )
    }
}

Listboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    cards: state.project.cards,
})

const mapDispatchToProps ={
    createCard: _action.listAction.createCard,
    updateTitle: _action.listAction.updateListTitle,
    deleteList: _action.listAction.deleteList,
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Listboard))

