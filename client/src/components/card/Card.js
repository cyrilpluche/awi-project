/** REACT */
import React from 'react';
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
import MemberOnCard from "./membersOnCard/MembersOnCard";

class Cardboard extends React.Component {
    constructor (props) {
        super(props)
        this.updateCard = this.updateCard.bind(this)

        this.state = {
            open: false,
            card: this.props.currentCard
        };


    }

    componentDidMount () {
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
        this.state.card[name] = event.target.value
        this.setState({
            maj: true,
        })
    };

    updateCard () {
        this.props.onUpdateCard(this.state.card, this.state.card);
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
                                    <TextField
                                        id="cardDescription"
                                        label="Description"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={this.state.card.cardDescription}
                                        onChange={this.handleChangeCard('cardDescription')}
                                        margin="normal"
                                        variant="outlined"
                                    />
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
    onGetCard : _action.cardAction.getCard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cardboard));