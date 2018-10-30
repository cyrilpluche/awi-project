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

    handleClose = () => {
        this.setState({ open: false });
        this.props.onUpdateCard("testSendAmin")
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
                                    Clean the github
                                </Typography>
                                <Divider className={classes.divider}/>
                                <div className={classes.row}>
                                    <h4 >Members : </h4>
                                    <Avatar className={classes.marginCard}>H</Avatar>
                                    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonIcon} ><AddIcon/></Button>
                                </div>
                                <Divider className={classes.divider}/>
                                <div className={classes.row}>
                                    <h4>Labels : </h4>
                                    <Button disabled className={classes.buttonLabel}>Backend</Button>
                                    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonIcon} ><AddIcon/></Button>
                                </div>
                                <Divider className={classes.divider}/>
                                <div>
                                    <div className={classes.row}>
                                        <h4>Description</h4>
                                        <button className={classes.editButton}><SvgIcon>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>}</SvgIcon></button>
                                    </div>
                                    <TextField className={classes.textArea}
                                               value="************* *********** ********* ********** ******* *********** ********** ************* ***"
                                               multiline={true}
                                               rows={2}
                                               rowsMax={10}
                                    />
                                </div>
                                <Divider className={classes.divider}/>
                                <div>
                                    <div className={classes.row}>
                                        <h4>Comment</h4>
                                        <button className={classes.editButton}><SvgIcon>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>}</SvgIcon></button>
                                    </div>
                                    <TextField className={classes.textArea}
                                               value="************* *********** ********* ********** ******* *********** ********** ************* ***"
                                               multiline={true}
                                               rows={2}
                                               rowsMax={10}
                                    />
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
                            title={this.props.card.cardInfo}
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            <Typography component="p">
                                By merging all branches update the master branch
                            </Typography>
                            <div className={classes.rowRight}><Avatar className={classes.marginCard}>H</Avatar></div>
                            <Button disabled className={classes.buttonLabel}>Backend</Button>
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
