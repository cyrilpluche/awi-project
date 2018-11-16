import React from 'react'
import { connect } from 'react-redux'
import { style } from './Style'
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Save';
import { Theme } from "../../ui/palette/Palette";
import {MuiThemeProvider} from "@material-ui/core/es";
import Grid from "@material-ui/core/Grid/Grid";
import _action from "../../../actions";
import Snackbar from "../../ui/snackbar/Snackbar"
import Avatar from "@material-ui/core/Avatar/Avatar";
import MiniLoader from "../../ui/loader/MiniLoader"
import classNames from 'classnames';
import Divider from "@material-ui/core/Divider/Divider";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class Overview extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.changePicture = this.changePicture.bind(this)
        this.handleProfilePicture = this.handleProfilePicture.bind(this)

        this.state = {
            labelsForClient: ['First name', 'Last name', 'Pseudo'],
            memberFirstname: this.props.member.memberFirstname,
            memberLastname: this.props.member.memberLastname,
            memberPseudo: this.props.member.memberPseudo,
            memberEmail: this.props.member.memberEmail,
            isEditable: false,
            openSnackbar: false
        }
    }

    // Update member state with new informations of textfields
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    // Make textfields editable
    handleIsEditable = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    // Submit the member form to update db and store
    submit () {
        let body = {
            memberId: this.props.member.memberId,
            memberFirstname: this.state.memberFirstname,
            memberLastname: this.state.memberLastname,
            memberEmail: this.state.memberEmail,
            memberPseudo: this.state.memberPseudo
        }
        this.props.onUpdateMember(body)
        this.setState({
            openSnackbar: true,
            isEditable: false
        })
    }

    handleProfilePicture (event) {
        this.setState({
            file: event.target.files[0]
        })
    }

    changePicture () {
        if (this.state.file) {;
            const formData = new FormData()
            formData.append('image', this.state.file[0], this.state.file[0].name)

            this.props.onUpdateMemberPicture(formData, this.props.member.memberId)
            this.setState({
                openSnackbar: true,
                isEditable: false
            })
        }
    }

    // Handle the snackbar state
    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

    // Loop that create textfields

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid container justify='center' className={ classes.logoContainer }>
                    { !this.props.isLoading ? (
                        <Avatar
                            alt={this.state.memberFirstname + 'sharp'}
                            src={this.props.member.memberPicture}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    ) : (
                        <MiniLoader size={200} />
                    )}

                </Grid>
                <Grid justify='center' alignItems='center' container>
                    <Grid xs={4} item>
                        <FilePond
                            maxFiles={3}
                            className={classes.upload }
                            onupdatefiles={(fileItems) => {
                                // Set current file objects to this.state
                                this.setState({
                                    file: fileItems.map(fileItem => fileItem.file)
                                });
                            }}
                        />
                    </Grid>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        className={classes.button}
                        disabled={!this.state.isEditable}
                        onClick={this.changePicture}
                    >
                        <AddAPhotoIcon className={(classes.leftIcon, classes.iconSmall)} />
                    </Button>
                </Grid>
                <Grid justify='center' container>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </Grid>
                <Grid container justify='flex-start'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isEditable}
                                onChange={this.handleIsEditable('isEditable')}
                                value="isEditable"
                                color="primary"
                            />
                        }
                        label="Edit informations"
                    />
                    <MuiThemeProvider theme={Theme.successWarningError}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.button}
                            disabled={!this.state.isEditable}
                            onClick={this.submit}
                        >
                            <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
                            Save
                        </Button>
                    </MuiThemeProvider>
                </Grid>
                <Grid item>

                </Grid>
                <Grid container justify="flex-start">
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            disabled={!this.state.isEditable}
                            id='memberFirstname'
                            label='Firstname'
                            className={classes.textField}
                            value={this.state.memberFirstname}
                            onChange={this.handleChange('memberFirstname')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            disabled={!this.state.isEditable}
                            id='memberLastname'
                            label='Lastname'
                            className={classes.textField}
                            value={this.state.memberLastname}
                            onChange={this.handleChange('memberLastname')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            disabled={!this.state.isEditable || this.props.member.memberIsLinkWithGithub}
                            id='memberPseudo'
                            label='Pseudo'
                            className={classes.textField}
                            value={this.state.memberPseudo}
                            onChange={this.handleChange('memberPseudo')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            disabled={!this.state.isEditable || this.props.member.memberEmail !== null}
                            id='memberEmail'
                            label='Email'
                            className={classes.textField}
                            value={this.state.memberEmail}
                            onChange={this.handleChange('memberEmail')}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>
                </Grid>
                <Snackbar
                    handleSnackbarClose={this.handleSnackbarClose}
                    open={this.state.openSnackbar}
                    message="Informations updated."
                />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.signin.member,
    isLoading: state.profile.isLoading
})

const mapDispatchToProps = {
    onUpdateMember: _action.profileAction.updateMember,
    onUpdateMemberPicture: _action.profileAction.updateMemberPicture
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Overview));