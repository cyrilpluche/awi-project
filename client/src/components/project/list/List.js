import React, { Component } from 'react';
import Card from '../card/Card'
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import { styles } from './Style'
import { connect } from 'react-redux'
import _action from '../../../actions'

// Material-ui import

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';

const ITEM_HEIGHT = 48;

class Listboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            editListTitle : false,
            newListTitle:'',
            newCardTitle:'',
            open: false,
            anchorEl: null,
            cards: []
        }
    }


    createNewCard(){
        let cardName = this.state.newCardTitle
        let listId = this.props.list.listId
        if(cardName) this.props.createCard(cardName,listId)

    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };

    handleCloseDialog = (value) => {
        this.setState({ newCardTitle: value, open: false }, function(){  this.createNewCard()});

    };

    handleClickEditMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseEditMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleEditTitle(){
        this.setState({editListTitle:true})
    }

    handleValidationEditTitle(){
        this.setState({editListTitle:false})
        const {newListTitle} = this.state
        // update List title
        if(newProjectTitle) this.props.updateTitle(newProjectTitle, this.props.match.params.id)
    }

    deleteList = () => {


    };


    render() {
        const {classes,cards, list} = this.props;
        const { anchorEl } = this.state;
        const isOpenEditMenu = Boolean(anchorEl);

        const EditMenu = (
            <div className={classNames(classes.button, classes.rowRight)}>
                <Button
                    aria-label="More"
                    aria-owns={isOpenEditMenu ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    size="small"
                    className={classNames(classes.button, classes.rowRight)}
                    onClick={this.handleClickEditMenu}
                >
                    <MoreVertIcon/>
                </Button>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={isOpenEditMenu}
                    //onClose={this.handleCloseEditMenu()}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleCloseEditMenu}>Modifier le titre</MenuItem>
                    <MenuItem onClick={this.handleCloseEditMenu}>Supprimer la liste</MenuItem>

                </Menu>
            </div>
        )

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

                                     <b>{this.props.list.listTitle}</b>
                                     {EditMenu}
                                 </ListSubheader>}
                        >

                            <SimpleDialog
                                type="card"
                                open={this.state.open}
                                onClose={this.handleCloseDialog}
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
                            <ListItem button onClick={this.handleClickOpen} className={classes.listItem}>
                                <ListItemText inset primary="+ Add a new card" />
                            </ListItem>


                        </List>
                    </div>
                )}
            </Draggable>
        )
    }
}
//{list.listContent.map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ) }

Listboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    cards: state.project.cards
})

const mapDispatchToProps ={
    createCard: _action.listAction.createCard,
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Listboard))

