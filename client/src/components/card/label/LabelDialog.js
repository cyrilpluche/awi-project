import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { styles } from './Style'
import _action from "../../../actions/index";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Grid from "@material-ui/core/Grid/Grid";


class LabelDialog extends React.Component {
    constructor (props) {
        super(props);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
        this.state = {
            card: this.props.card,
            selectedIndex: 1,
        }
    }

    handleChangeCheckbox = name => event => {
        //let index = event.target.id.split('/')[1]
        //let checked = event.target.checked
        let index = event.target.id.split('/')[1]
        let checked = event.target.checked
        let label = this.props.labels[index]
        let labelId = this.props.labels[index].labelId
        let cardId = this.props.card.cardId

        if(checked){
            this.state.card.HaslabelCardFks.push({ cardId: cardId, labelId: labelId, Label: label  }) //TODO use setState
            this.props.onCreateLinkLabel({ cardId: cardId, labelId: labelId })
        }else{
            let indexLink = this.state.card.HaslabelCardFks.findIndex(list => list.labelId === labelId)
            this.state.card.HaslabelCardFks.splice(indexLink,1) //TODO use setState
            this.props.onDeleteLinkLabel({ cardId: cardId, labelId: labelId })
        }
        this.setState({ maj: true });
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { classes, onClose, selectedValue, onDeleteLinkLabel, onCreateLinkLabel, ...other } = this.props;
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                maxWidth="xs"
                {...other}
            >
                <DialogTitle id="simple-dialog-title">Set labels</DialogTitle>
                <DialogContent>
                    <List component="nav">
                        { this.props.labels == null ? (
                            null
                        ) :  this.props.labels ? this.props.labels.map((label,index) => {
                            return (
                                <ListItem
                                    key={label.labelId}
                                    selected={this.state.selectedIndex === 2}
                                >
                                    <Grid justify='center' alignItems='center' container>
                                        <Button variant="contained" style={{backgroundColor: label.labelColor}}/>
                                        <Checkbox
                                            style={{color: label.labelColor}}
                                            id={'checklist/'+index}
                                            onChange={this.handleChangeCheckbox('checklist')}
                                            value='checklist'
                                            checked = {!(this.state.card.HaslabelCardFks.find(link => link.labelId === label.labelId) === undefined)}
                                        />
                                    </Grid>
                                </ListItem>
                            )
                        }):null}
                        <ListItem>
                            <Button
                                color='primary'
                                variant='outlined'
                                fullWidth
                                onClick={this.handleClose}
                            >
                                ok
                            </Button>
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        );
    }
}

LabelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
};

const LabelDialogWrapped = withStyles(styles)(LabelDialog);


class Label extends React.Component {
    state = {
        open: false
    };

    componentDidMount (){
        this.props.onGetLabels(this.props.route.params.id)
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button
                    color="primary"
                    className={classes.button}
                    fullWidth
                    onClick={this.handleClickOpen}
                >
                    Label
                </Button>
                <LabelDialogWrapped
                    open={this.state.open}
                    onClose={this.handleClose}
                    card = {this.props.card}
                    labels = {this.props.labels}
                    onCreateLinkLabel = {this.props.onCreateLinkLabel}
                    onDeleteLinkLabel = {this.props.onDeleteLinkLabel}
                />
            </div>
        );
    }
}

Label.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
    labels: state.card.labels
});
const mapDispatchToProps = {
    onGetLabels : _action.cardAction.getLabels,
    onCreateLinkLabel : _action.cardAction.createLinkLabel,
    onDeleteLinkLabel : _action.cardAction.deleteLinkLabel
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Label));