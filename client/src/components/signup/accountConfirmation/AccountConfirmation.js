import React from 'react'
import { connect } from 'react-redux'
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import logo from "../../../public/images/prello-logo-2.png";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button/Button";
import _helper from "../../../helpers"

class accountConfirmation extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        if (!this.props.isAccountValidNow) {
            _helper.History.push('/login')

        }
    }

    goToLogin () {
        _helper.History.push('/login')
    }

    render() {
        const {classes} = this.props;
        return (
           <Grid container justify="center">
               <Grid justify='center' container className={classes.logo}>
                   <Grid item>
                       <img src={logo} width="100"/>
                   </Grid>
               </Grid>

               <Typography variant="h4" gutterBottom className={classes.marginBottom}>
                   Your account is now ready for Prello.
               </Typography>

               <Grid container justify="center">
                   <Button
                       variant="outlined"
                       color="primary"
                       onClick={this.goToLogin}
                       className={classes.button}
                   >
                       Let's start
                       <DoneIcon className={classes.rightIcon} />
                   </Button>
               </Grid>
           </Grid>
        )
    }
}

accountConfirmation.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAccountValidNow: state.signup.isAccountValidNow,
    isLoading: state.signup.isLoading
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(accountConfirmation));