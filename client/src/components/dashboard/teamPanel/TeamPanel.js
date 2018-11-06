import React from 'react'
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { style } from './Style'
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People'
import ClearIon from '@material-ui/icons/Clear'
import IconButton from "@material-ui/core/IconButton";
import GroupWork from '@material-ui/icons/SupervisedUserCircle'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
// todo import action


class TeamPanel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            drawerOpen: false,
            dialogDisplayed: false,
            buttonCreateTeamDisabled: true
        };
    }


    handleDrawerClick = () => {
        this.setState(state => ({ drawerOpen: !state.drawerOpen }));
    };

    handleClickOpenDialog = () => {
        this.setState({ dialogDisplayed: true });
    };

    handleCloseDialog = () => {
        this.setState({ dialogDisplayed: false, buttonCreateTeamDisabled: true });
        // close the dialog and disable the button
    };

    handleChangeTeamName = (event) => {
        let e = document.querySelector('#teamName').value
        if (e === undefined ||e === '')
            this.setState({buttonCreateTeamDisabled: true });
        else {
            this.setState({buttonCreateTeamDisabled: false });
        }
    };


    render() {
        const { classes } = this.props;

        let dialog = (
            <Dialog
                open={this.state.dialogDisplayed}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Grid container style={{textAlign: 'center'}}  alignItems='center'>
                        <Grid item xs={2} sm={3}>
                            <PeopleIcon style={{fontSize: '32px', color :'#d6d6c2'}}/>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <span style={{marginLeft: '5%'}}>Create a new team</span>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <IconButton onClick={this.handleCloseDialog}>
                                <ClearIon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="teamName-input" required>
                                <span style={{fontSize: '15px'}}>Name</span>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <InputBase
                                id="teamName"
                                style={{marginBottom: '2%', marginTop: '1%'}}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                                placeholder="team name"
                                fullWidth required autoFocus
                                onChange={this.handleChangeTeamName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="teamDescription-input">
                                <span style={{fontSize: '15px'}}>Description</span>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <InputBase
                                id="teamDescription"
                                placeholder="short description"
                                style={{marginBottom: '2%', marginTop: '1%'}}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                                fullWidth rows={4} multiline
                            />
                        </Grid>
                        <Grid item xs={3}/>
                        <Grid item xs={6}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button color="primary" fullWidth variant="outlined"
                                disabled={this.state.buttonCreateTeamDisabled}>
                            Create
                        </Button>
                    </DialogActions>
                    <DialogContentText style={{textAlign: 'center'}}>
                        <span style={{fontSize: '12px', textAlign: 'center'}}>
                            A team is group of project and a group of people who work together.<br />
                            Create your team then you will be able to add your friends and create your projects
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )

        let teams = ''
        if (this.props.teams !== undefined) {
            teams = (
                this.props.teams.map((team, i) =>
                    <ListItem button className={classes.nested} key={i}>
                        <ListItemIcon>
                            <GroupWork style={{fontSize: '20px'}} />
                        </ListItemIcon>
                        <ListItemText inset secondary={team.teamName} />
                    </ListItem>
                )
            )
        }


        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div" >Teams</ListSubheader>}
                    >
                        <ListItem button onClick={this.handleDrawerClick}>
                            <ListItemIcon>
                                <PeopleIcon style={{fontSize: '30px'}} className={classes.iconHover}/>
                            </ListItemIcon>
                            <ListItemText inset primary="My teams" />
                            {this.state.drawerOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={this.state.drawerOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {teams}
                            </List>
                        </Collapse>
                    </List>
                    <Divider/>
                    <List component="nav">
                        <ListItem button onClick={this.handleClickOpenDialog}>
                            <ListItemIcon>
                                <AddIcon style={{fontSize: '30px'}} className={classes.iconHover}/>
                            </ListItemIcon>
                            <ListItemText primary="Add a new team" />
                        </ListItem>
                    </List>
                </Grid>
                {dialog}
            </Grid>
        )
    }
}

TeamPanel.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
//    teams: state.team.teams
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(TeamPanel));