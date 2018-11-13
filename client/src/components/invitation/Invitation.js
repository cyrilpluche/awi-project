import React from 'react'
import { connect } from 'react-redux'
import { withStyles} from "@material-ui/core";
import { style } from './Style'
import _action from "../../actions";

import LoaderPage from "../loaderPage/LoaderPage"
import Grid from "@material-ui/core/Grid/Grid";
import logo from "../../public/images/prello-logo-2.png";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from 'prop-types';
import Signup from "../signup/Signup";
import Signin from "../signin/Signin";

class Invitation extends React.Component {
    constructor(props){
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.acceptInvitation = this.acceptInvitation.bind(this)
        this.refuseInvitation = this.refuseInvitation.bind(this)
    }

    componentDidMount () {
        let params = this.props.location.pathname.split('/')
        let token = params[2]
        this.props.onDecryptInvitation(token)

    }

    acceptInvitation () {
        let body = {
            memberhasprojectStatus: 1,
            projectIsFavorite: false
        }
        let query = {
            projectId: this.props.project.projectId,
            memberId: this.props.member.memberId
        }
        this.props.onReplyToInvitation(true, body, query, this.props.member)
    }

    refuseInvitation () {
        let query = {
            projectId: this.props.project.projectId,
            memberId: this.props.member.memberId
        }
        this.props.onReplyToInvitation(false, null, query)
    }

    render() {
        const {classes} = this.props;
        console.log(this.props)
        return (
            <div className={ classes.layout }>
                {this.props.isLoading || this.props.isLoadingGlobal ? (
                    <LoaderPage/>
                ) : this.props.isLogged ? (
                    <div>
                        {this.props.isAccountValid ? (
                            <Grid container justify="center">
                                <Grid justify='center' container className={classes.logo}>
                                    <Grid item>
                                        <img src={logo} width="100" alt="prello logo"/>
                                    </Grid>
                                </Grid>

                                <Grid justify="center" container>
                                    <Typography variant="h5" gutterBottom className={classes.marginBottom}>
                                        You received an invitation to join a project.
                                    </Typography>
                                </Grid>
                                <Grid justify="center" container>
                                    <Typography variant="overline" gutterBottom className={classes.marginBottom}>
                                        {this.props.project.projectTitle}
                                    </Typography>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item xs={8} sm={4} md={3}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={this.acceptInvitation}
                                        >
                                            join
                                            <DoneIcon className={classes.rightIcon} />
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item xs={8} sm={4} md={3}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={this.refuseInvitation}
                                        >
                                            Refuse
                                            <CloseIcon className={classes.rightIcon} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <div>Error</div>
                        )}
                    </div>
                ) : this.props.member.memberStatus === 1 ? (
                    <Signin parent='Invitation' invitation={{memberEmail: this.props.member.memberEmail}} />
                ) : (
                    <Signup invitation={{memberEmail: this.props.member.memberEmail}} />
                )}
            </div>
        )
    }
}

Invitation.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isLoadingGlobal: state.signin.isLoading,
    isLoading: state.invitation.isLoading,
    isAccountExist: state.invitation.isAccountExist,
    isAccountValid: state.invitation.isAccountValid,
    isLogged: state.signin.isLogged,
    member: state.invitation.member,
    project: state.invitation.project
})

const mapDispatchToProps = {
    onDecryptInvitation: _action.invitationAction.isMemberExist,
    onReplyToInvitation: _action.invitationAction.replyToInvitation
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Invitation));