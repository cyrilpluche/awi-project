/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _helper from '../../helpers'

/** COMPONENTS */
import PrelloDesktop from '../../public/files/Prello-linux-x64.zip'

/** MATERIAL UI */
import { style } from './Style'
import Grid from "@material-ui/core/Grid/Grid";
import logo from "../../public/images/prello-logo-2.png";
import downloadPicture from "../../public/images/download-picture.png";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import GetAppIcon from '@material-ui/icons/GetApp'
import CloseIcon from "@material-ui/icons/Close";

/** ICONS */
class Download extends React.Component {
    constructor (props) {
        super(props)
    }

    leavePage () {
        _helper.History.push('/home')
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center">
                {!this.props.isLogged ? (
                    <Grid justify='center' container className={classes.logo}>
                        <Grid item>
                            <img src={logo} width="100" alt="prello logo"/>
                        </Grid>
                    </Grid>
                ) : null}

                <Typography variant="h4" gutterBottom className={classes.marginBottom}>
                    Download Prello for Desktop
                </Typography>

                <Grid container justify="center" alignItems="center">
                    <Grid xs={5} item>
                        <Grid container justify="center" alignItems="center">
                            <Typography variant="overline">
                                Available for linux
                            </Typography>
                        </Grid>
                        <Grid justify='center' container alignItems="center">
                            <Grid item xs={8}>
                                <Grid justify='center' container alignItems="center">
                                    <Typography variant="caption" className={ classes.marginBottomXs }>
                                        By downloading Prello, you agree to the terms of use and the privacy policy.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid justify='center' container alignItems="center">
                            <Grid item xs={4}>
                                <Button
                                    href={PrelloDesktop}
                                    download
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                >
                                    Get Prello
                                    <GetAppIcon className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={5} item>
                        <Grid container justify="center" alignItems="center">
                            <img src={downloadPicture} alt='download picture' className={classes.downloadPicture}/>
                        </Grid>
                    </Grid>
                    {!this.props.isLogged ? (
                        <Grid className={ classes.marginTop } container justify='center'>
                            <Grid xs={2} container>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={this.leavePage}
                                    className={classes.button}
                                >
                                    Back
                                    <CloseIcon className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        )
    }
}

Download.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isLogged: state.signin.isLogged
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Download));