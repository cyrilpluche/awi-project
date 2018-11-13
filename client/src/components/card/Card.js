/** REACT */
import React from 'react';
import ReactDOMServer from "react-dom/server";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";

/** COMPONENTS */
import { styles } from './Style'
import _action from "../../actions";
import Checklist from './checklist/ChecklistDialog';
import LabelDialog from './label/LabelDialog'
import ConfirmationDialog from './confirmation/ConfirmationDialog';
import MiniLoader from "../ui/loader/MiniLoader";

/** MATERIAL UI */
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton';
import {Edit,Done,Cancel} from '@material-ui/icons';
import MemberOnCard from "./membersOnCard/MembersOnCard";

/** MARKDOWN EDITOR */
import SimpleMDEReact from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

class Cardboard extends React.Component {
    constructor (props) {
        super(props)
        this.updateCard = this.updateCard.bind(this)
        this.handleChangeDueDate = this.handleChangeDueDate.bind(this)
        this.handleEditDueDate = this.handleEditDueDate.bind(this)
        this.handleValidDueDate = this.handleValidDueDate.bind(this)
        this.handleCancelDueDate = this.handleCancelDueDate.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.editDescription = this.editDescription.bind(this)
        this.validEditDescription = this.validEditDescription.bind(this)
        this.state = {
            open: false,
            card: this.props.currentCard,
            description: this.props.currentCard.cardDescription,
            dueDate : this.props.currentCard.cardDateTarget,
            editDueDate : false,
            editDescription:false,
            init: false,
        };


    }



    componentDidUpdate(){
        if(!this.state.init){
            this.setState({dueDate : this.props.currentCard.cardDateTarget,init: true ,description: this.props.currentCard.cardDescription})
        }
        //this.props.onGetCard(this.props.currentCard.cardId)
        if (this.props.route.params.cardid) {
            if (this.props.route.params.cardid.toString() === this.props.currentCard.cardId.toString()) {
                this.setState({open: true})
            }
        }
    };

    /** Open/Close the card modal */
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    /** Update and create project */
    handleChangeCard = name => event => {
        console.log(event.target.value)
        this.state.card[name] = event.target.value
        this.setState({
            maj: true,
        })
    };

    updateCard () {
        this.props.onUpdateCard(this.state.card, this.state.card);
    }

    handleChangeDueDate = name => event =>{
        this.setState({
            dueDate: event.target.value
        })
    }
    handleEditDueDate(){
        this.setState({editDueDate:true})
    }
    handleValidDueDate(){

        if(this.state.dueDate) {
        this.props.onUpdateDate(this.props.currentCard, {cardDateTarget:this.state.dueDate})
        this.setState({editDueDate:false})
        }
    }

    handleCancelDueDate(){
        
        this.setState({editDueDate:false})
    }

    handleChangeDescription= name => event =>{
        console.log( event)
        this.setState({description : event})
    }

    getInstance = (instance) => {
        // You can now store and manipulate the simplemde instance. 
        this.setState({instance : instance})
        instance.togglePreview();
    }

    editDescription(){
        this.state.instance.togglePreview();
        this.setState({editDescription:true})
        
    }
    validEditDescription(){
        this.state.instance.togglePreview();
        this.setState({editDescription:false})
    }

    /*changeTitle = () => {
        let dom = document.querySelector('#cardTitle');
        let value = dom.value;
        this.props.card.cardTitle = value;
        this.props.onUpdateCard(this.props.card, {cardTitle: value});
    };

    changeDescription = () => {
        let dom = document.querySelector('#cardDescription');
        let value = dom.value;
        this.props.card.cardDescription = value;
        this.props.onUpdateCard(this.props.card, {cardDescription: value});
    };*/

    render() {
        const { classes } = this.props;

        const cardDialog = (

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    { this.props.currentCard ? (
                        <Grid justify='center' container>
                            <Grid xs={8} item>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <Grid container justify='space-between' alignItems='flex-end'>
                                        <Grid item xs={9}>
                                            <TextField
                                                id="cardTitle"
                                                label="Title"
                                                className={classes.textField}
                                                value={this.state.card.cardTitle}
                                                onChange={this.handleChangeCard('cardTitle')}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                fullWidth
                                                color="primary"
                                                className={classes.button}
                                                onClick={this.updateCard}
                                            >
                                                <SaveIcon/>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {!this.state.editDueDate ?
                                    <Grid container justify="space-between" alignItems='center' >
                                        <Grid item xs={10}>  
                                            
                                            <Typography variant='caption' >
                                                Due date : {this.state.dueDate ? this.state.dueDate : "not defined" }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>  
                                            <IconButton color="primary" size="small" aria-label="valid" onClick={this.handleEditDueDate}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    : <Grid container justify="space-between" alignItems='center' >
                                         <Grid item xs={8}>  
                                            <TextField
                                                id="date"
                                                label="Due Date"
                                                type="date"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                onChange={this.handleChangeDueDate('dueDate')}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton className={classes.done} size="small" aria-label="valid" onClick={this.handleValidDueDate}>
                                                <Done fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton  color="secondary" size="small" aria-label="valid" onClick={this.handleCancelDueDate}>
                                                <Cancel fontSize="small" />
                                            </IconButton>
                                        </Grid> 
                                    </Grid>  }
                                    <Grid container justify="space-between" alignItems='center' >
                                        <Grid item xs={10}>
                                            <Typography variant='subtitle1' gutterBottom>
                                                Description
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                                { this.state.editDescription?
                                                <IconButton  color="primary" size="small" aria-label="valid" onClick={this.validEditDescription} >
                                                    <Done fontSize="small" />
                                                </IconButton>
                                                :<IconButton  color="primary" size="small" aria-label="valid" onClick={this.editDescription}>
                                                    <Edit fontSize="small" />
                                                </IconButton>}                                                                                               
                                        </Grid> 
                                        <Grid item xs={12}>
                        
                                            <SimpleMDEReact
                                                className={classes.markdown}
                                                getMdeInstance= { this.getInstance } 
                                                
                                                value={this.state.description}
                                                onChange={this.handleChangeDescription('description')}
                                                options={{
                                                    autofocus: true,
                                                }}
                                            />
                                            
                                        </Grid>
                                    </Grid>
    
                                </form>
                            </Grid>
                            <Grid xs={4} item>
                                <MemberOnCard
                                    route={this.props.route}
                                    card={this.props.currentCard}
                                />
                                <LabelDialog
                                    route={this.props.route}
                                    card={this.props.currentCard}
                                />
                                <Checklist
                                    card={this.props.currentCard}
                                />
                                <ConfirmationDialog 
                                    content = {{type:'archive'}} 
                                    card={this.state.card} 
                                    listIndex={this.props.listIndex}
                                    cardIndex={this.props.cardIndex}
                                    handleParentClose={this.handleClose}
                                />
                                <ConfirmationDialog
                                    content = {{type:'delete'}}
                                    card={this.state.card}
                                    listIndex={this.props.listIndex}
                                    cardIndex={this.props.cardIndex}
                                    handleParentClose={this.handleClose}
                                />
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    fullWidth
                                >
                                    Attachment
                                </Button>
                            </Grid>
                        </Grid>

                    ) : (
                        <MiniLoader/>
                    )}
                </DialogContent>
            </Dialog>
        )

        return (
            <div>
                {cardDialog}
                <Card className={classes.card} onClick={this.handleOpen} >
                    <CardActionArea>
                        <Grid justify='center' container>
                            <Typography variant="subtitle2">
                                {this.state.card.cardTitle}
                            </Typography>
                        </Grid>
                        {this.props.currentCard.members ? (
                            <div className={classes.rowRight}>
                                <Avatar className={classes.marginCard}>
                                    {this.state.card.members}
                                </Avatar>
                            </div>
                        ) : null}
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

Cardboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
    onUpdateCard : _action.cardAction.updatecard,
    onGetCard : _action.cardAction.getCard,
    onUpdateDate: _action.listAction.updateDueDateCard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cardboard));