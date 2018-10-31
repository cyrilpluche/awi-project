import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styles } from './Style'
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Modal from '@material-ui/core/Modal';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import { Scrollbars } from 'react-custom-scrollbars';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Divider from "@material-ui/core/Divider/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import _action from "../../actions";
import connect from "react-redux/es/connect/connect";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class Cardboard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    sendToStore = (typeField, valueField) => {
        const object = {
            id: this.props.card.id,
            title: this.props.card.title,
            deadline: this.props.card.deadline,
            description: this.props.card.description,
            labels: this.props.card.labels,
            members: this.props.card.members,
            comments: this.props.card.comments
        };
        switch (typeField) {
            case 'title': object.title = valueField; break;
            case 'deadline': object.deadline = valueField; break;
            case 'description': object.description = valueField; break;
            case 'labels': object.labels = valueField; break;
            case 'members': object.members = valueField; break;
            case 'comments': object.comments = valueField; break;
            default: break;
        }
        this.props.onUpdateCard(object)
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
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
                                <Typography variant="h5" id="modal-title">
                                    {this.props.card.title}
                                </Typography>
                                <Divider className={classes.divider}/>
                                <div className={classes.row}>
                                    <h4 >Members : </h4>
                                    <Avatar className={classes.marginCard}>{this.props.card.members}</Avatar>
                                    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonIcon} ><AddIcon/></Button>
                                </div>
                                <Divider className={classes.divider}/>
                                <div className={classes.row}>
                                    <h4>Labels : </h4>
                                    <Button disabled className={classes.buttonLabel}>{this.props.card.labels}</Button>
                                    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonIcon} ><AddIcon/></Button>
                                </div>
                                <Divider className={classes.divider}/>
                                <div>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <h4>Description</h4>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>{this.props.card.description}</Typography>
                                            <SvgIcon className={classes.iconComments}>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>}</SvgIcon>
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
                                <Button variant="contained" className={classes.buttonModal}>Labels</Button>
                                <Button variant="contained" className={classes.buttonModal}>Checklist</Button>
                                <Button variant="contained" className={classes.buttonModal}>Description</Button>
                                <Button variant="contained" className={classes.buttonModal}>Comment</Button>
                                <Button variant="contained" className={classes.buttonModal}>Attachment</Button>
                                <Button variant="contained" className={classes.buttonModal}>Copy</Button>
                                <Button variant="contained" className={classes.buttonModal}>Archive</Button>
                                <Button variant="contained" className={classes.buttonModal}>Delete</Button>
                            </div>
                        </div>
                    </Scrollbars>
                </Modal>
                <Card className={classes.card} >
                    <CardActionArea onClick={this.handleOpen}>
                        <CardHeader
                            title={this.props.card.title}
                            subheader={this.props.card.deadline}
                        />
                        <CardContent>
                            <Typography component="p">
                                {this.props.card.description}
                            </Typography>
                            <div className={classes.rowRight}><Avatar className={classes.marginCard}>{this.props.card.members}</Avatar></div>
                            <Button disabled className={classes.buttonLabel}>{this.props.card.labels}</Button>
                        </CardContent>
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
    card: state.updatecard.card
})
const mapDispatchToProps = {
    onUpdateCard : _action.updateCardAction.updatecard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cardboard));