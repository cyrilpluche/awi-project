/** REACT */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";

/** COMPONENTS */
import { styles } from './Style'
import _action from "../../actions";
import Checklist from './checklist/ChecklistDialog';
import LabelDialog from './LabelDialog'
import ConfirmationDialog from './ConfirmationDialog';
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

        /*const oldDialog = (
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
            >
                <Scrollbars style={
                    {
                        width: `54.5%`,
                        height: `65%`,
                        top: `50%`,
                        left: `50%`,
                        transform: `translate(-50%, -50%)`
                    }
                }>
                    <div className={classes.paper}>
                        <div className={classes.column} style={{ borderRight: '0.1em solid grey'}}>
                            <div className={classes.row}>
                                <InputBase
                                    id="cardTitle"
                                    defaultValue={this.props.card.cardTitle}
                                />
                                <button onClick={this.changeTitle}>
                                    <SvgIcon className={classes.iconComments}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>}</SvgIcon>
                                </button>
                            </div>
                            <Divider className={classes.divider}/>
                            <div className={classes.row}>
                                <h4 >Members : </h4>
                                <Avatar className={classes.marginCard}>{this.props.card.members}</Avatar>
                                <SvgIcon className={classes.buttonIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}</SvgIcon>
                            </div>
                            <Divider className={classes.divider}/>
                            <div className={classes.row}>
                                <h4>Labels : </h4>
                                <Button disabled className={classes.buttonLabel}>TODO</Button>
                                <SvgIcon className={classes.buttonIcon}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}</SvgIcon>
                            </div>
                            <Divider className={classes.divider}/>
                            <div>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <h4>Description</h4>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <TextField
                                            id="cardDescription"
                                            defaultValue={this.props.card.cardDescription}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={4}
                                        />
                                        <button onClick={this.changeDescription}>
                                            <SvgIcon className={classes.iconComments}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>}</SvgIcon>
                                        </button>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                            <Divider className={classes.divider}/>
                            <div>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <h4>Comment</h4>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>Without comment</Typography>
                                    </ExpansionPanelDetails>
                                    <Divider className={classes.divider}/>
                                    <ExpansionPanelDetails>
                                        <div className={classes.comments}>
                                            <TextField className={classes.textArea}
                                                       placeholder={"Add your comment ..."}
                                                       multiline={true}
                                                       rows={2}
                                                       rowsMax={10}
                                            />
                                            <div>
                                                <SvgIcon className={classes.iconComments}>{<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 5H4C1.8 5 0 6.8 0 9s1.8 4 4 4h10v-1H4c-1.7 0-3-1.3-3-3s1.3-3 3-3h11c1.1 0 2 .9 2 2s-.9 2-2 2H6c-.6 0-1-.4-1-1s.4-1 1-1h8V7H6c-1.1 0-2 .9-2 2s.9 2 2 2h9c1.7 0 3-1.3 3-3s-1.3-3-3-3z"/></svg>}</SvgIcon>
                                                <SvgIcon className={classes.iconComments}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>}</SvgIcon>
                                            </div>
                                        </div>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                            <Divider className={classes.divider}/>
                        </div>
                        <div>
                            <Button variant="contained" className={classes.buttonModal}>Members</Button>
                            <LabelDialog/>
                            <Checklist/>
                            <ConfirmationDialog content = {{type:'archive'}}/>
                            <ConfirmationDialog content = {{type:'delete'}}/>
                            <Button variant="contained" className={classes.buttonModal}>Attachment</Button>
                            <Button variant="contained" className={classes.buttonModal}>Copy</Button>
                        </div>
                    </div>
                </Scrollbars>
            </Modal>
        )*/

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
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    fullWidth
                                    onClick={this.updateCard}
                                >
                                    Members
                                </Button>
                                <LabelDialog/>
                                <Checklist/>
                                <ConfirmationDialog 
                                    content = {{type:'archive'}} 
                                    card={this.state.card} 
                                    listIndex={this.props.listIndex}
                                    cardIndex={this.props.cardIndex}
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
    membersOnCard: state.card.membersOnCard,
    membersOffCard: state.card.membersOffCard
})
const mapDispatchToProps = {
    onUpdateCard : _action.cardAction.updatecard,
    onGetCard : _action.cardAction.getCard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cardboard));