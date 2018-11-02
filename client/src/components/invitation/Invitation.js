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
import PropTypes from 'prop-types';

class Invitation extends React.Component {
    constructor(props){
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state= {
            projectTitle: props.projectTitle
        }
    }

    componentDidMount () {
        let params = this.props.location.pathname.split('/')
        let token = params[2]
        this.props.onDecryptInvitation(token)

    }

    test () {
        console.log(this.props.projectTitle)
        this.setState({ projectTitle: this.props.projectTitle })
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                {this.props.isLoading ? (
                    <LoaderPage/>
                ) : this.props.isAccountExist ? (
                    <div>
                        {this.props.isAccountValid ? (
                            <Grid container justify="center">
                                <Grid onClick={this.test.bind(this)} justify='center' container className={classes.logo}>
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
                                        {this.props.projectTitle}
                                    </Typography>
                                </Grid>


                                <Grid container justify="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        join
                                        <DoneIcon className={classes.rightIcon} />
                                    </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <div>NOT VALID NO !</div>
                        )}
                    </div>
                ) : (
                    <div>DONT EXIST YES !</div>
                )}
            </div>
        )
    }
}

Invitation.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAccountExist: state.invitation.isAccountExist,
    isAccountValid: state.invitation.isAccountValid,
    projectTitle: state.invitation.projectTitle,
    isLoading: state.invitation.isLoading,
})

const mapDispatchToProps = {
    onDecryptInvitation: _action.invitationAction.isMemberExist
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Invitation));