import React, { Component } from 'react';
import Card from '../card/Card'
import { withStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { styles } from './Style'
import { connect } from 'react-redux'
import _action from '../../../actions'


class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            newCardName:'',
            open: false,
            selectedValue: '',
            cards: []
        }
    }


    createNewCard(){
       
        let cardName = this.state.newCardName
        let listId = this.props.list.listId
        this.props.createCard(cardName,listId)
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };
    
    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
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
                                <Button className={classes.button}  onClick={this.createNewCard.bind(this)} variant="fab" mini  aria-label="Add">
                                <AddIcon />
                                </Button>
                                <TextField
                                id="standard-name"
                                label="Name"
                                className={classes.textField}
                                onChange={this.handleChange('newCardName')}
                                margin="normal"
                                />
                            </div>
                        <SimpleDialog
                            selectedValue={this.state.selectedValue}
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

class SimpleDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
      console.log(this.state)
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
      console.log(this.state)
    };
  
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">Add a new card </DialogTitle>
            <DialogContent>
                <TextField
                        id="outlined-multiline-static"
                        label="Card name"
                        name="selectedValue"
                        multiline
                        rows="3"         
                        margin="normal"
                        variant="outlined"
                        />
            </DialogContent>
            <DialogActions>
                    <Button variant="contained" color="primary" fullWidth size="small">
                        Add card
                    </Button>
            </DialogActions>
        </Dialog>
      );
    }
  }

withStyles(styles)(SimpleDialog)