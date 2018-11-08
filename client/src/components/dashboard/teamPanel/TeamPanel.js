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
import Typography from "@material-ui/core/es/Typography/Typography";
import GridList from "@material-ui/core/es/GridList/GridList";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/es/GridListTileBar/GridListTileBar";
import Background from '../../../public/images/project-bg.jpg'
import TextField from "@material-ui/core/es/TextField/TextField";


// todo import action


class TeamPanel extends React.Component {
    constructor (props) {
        super(props)
        this.createTeam = this.createTeam.bind(this)

        this.state = {
            openDialog: false,
            teamName: ''
        };
    }

    /** Open and close dialog */
    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    /** Update the name and create the team */
    handleChangeTeamName = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createTeam () {
        console.log('CREATE THE TEAM')
    }


    render() {
        const { classes } = this.props;

        /** NEW DIALOG */
        const createTeamDialog = (
            <Dialog
                open={this.state.openDialog}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <Grid container justify='center'>
                    <Typography variant='overline'>
                        Create a new team
                    </Typography>
                    <Grid xs={12} item>
                        <Divider/>
                    </Grid>
                </Grid>

                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="teamName"
                            label="Team name"
                            className={classes.textField}
                            value={this.state.teamName}
                            onChange={this.handleChangeTeamName('teamName')}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </form>
                    <Button
                        color="primary"
                        fullWidth
                        disabled={this.state.teamName.trim() === ''}
                        onClick={this.createTeam}
                    >
                        Create
                    </Button>
                </DialogContent>
            </Dialog>
        )

        /** NEW TEAM LIST */
        const teamList = (
            <GridList className={classes.gridList} cols={2.5}>
                {this.props.teams.map(team => (
                    <GridListTile key={team.teamId}>
                        <img src={Background} alt='prello logo' />
                        <GridListTileBar
                            title={team.teamName}
                            classes={{
                                root: classes.titleBar,
                                title: classes.gridTitle,
                            }}
                        />
                    </GridListTile>
                ))}
            </GridList>
        )

        /** NEW BUTTON */
        const createTeamButton = (
            <Button color="primary" className={classes.button} onClick={this.handleClickOpenDialog}>
                New
                <AddIcon className={classes.rightIcon} />
            </Button>
        )

        return (
            <Grid container>
                {createTeamDialog}
                <Grid container justify='space-between'>
                    <Typography variant="overline">
                        Teams
                    </Typography>
                    {createTeamButton}
                </Grid>
                <Grid xs={12} item>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    {teamList}
                </Grid>

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