import React, { Component } from 'react';
import Card from '../card/Card'
import { withStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import { styles } from './Style'
import { connect } from 'react-redux'
import _action from '../../../actions'


class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            newCardTitle:'',
            open: false,
            cards: []
        }
    }


    createNewCard(){
       console.log("JE RENTRE DANS CREATE CARD")
        let cardName = this.state.newCardTitle
        console.log(cardName)
        let listId = this.props.list.listId
        console.log()
        if(cardName) this.props.createCard(cardName,listId)
        
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };
    
    handleClose = (value) => {
        this.setState({ newCardTitle: value, open: false }, function(){  this.createNewCard()});
       
    };


    render() {
        const {classes,cards, list} = this.props
        
        return (
            <Draggable draggableId={this.props.list.listId} index={this.props.index}>
                {(provided) =>(
                    <div className={classes.list} 
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                    >
                        <h4 className={classes.listTitle} {...provided.dragHandleProps}>{this.props.list.listTitle}</h4>
                            <div>
                                <Button className={classes.button}  onClick={this.handleClickOpen} variant="fab" mini  aria-label="Add">
                                    <AddIcon />
                                </Button>
                            </div>

                        <SimpleDialog
                            type="card"
                            open={this.state.open}
                            onClose={this.handleClose}
                        />
                        <Droppable droppableId={this.props.list.listTitle} type="CARD">
                            {(provided) =>(
                                    <div 
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                    className={classes.dropSpace}>
                                      {cards.filter(card => card.listId === list.listId).map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ) }
                                       
                                    {provided.placeholder}
                                    
                                    </div>
                            )}
                        </Droppable>
                        
                        
                    </div>
                )}           
            </Draggable>   
        )
    }
}
//{list.listContent.map((card,index) =><Card key={card.cardId} card={card} index={index}></Card> ) }
const mapStateToProps = (state) => ({
    cards: state.project.cards
})

const mapDispatchToProps ={
    createCard: _action.listAction.createCard,    
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(List))

