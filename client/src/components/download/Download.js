/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _helper from '../../helpers'

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

    leavePage () {
        _helper.History.push('/home')
    }

    goToLink (event) {
        const type = event.currentTarget.id

        const windowsLink = 'https://drive.google.com/open?id=1T_1kY6ZImpbK8B5d9Mi88dvk2P2ucRLj'
        const linuxLink = 'https://drive.google.com/open?id=1r6_hcyRj3lUi73n_7h-SQdgKsrp6XBPL'
        const macLink = 'https://drive.google.com/open?id=10kXDiLWnG8eUSSLbefu3Z6wSTS2fugUX'

        if (type === 'linux') window.open(linuxLink)
        else if (type === 'mac') window.open(macLink)
        else if (type === 'windows') window.open(windowsLink)
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
                    <Grid xs={10} md={5} item>
                        <Grid container justify="center" alignItems="center">
                            <Typography variant="overline">
                                Available for linux and Mac
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
                            <Grid item xs={10} sm={8} md={4} className={ classes.marginBottomXs }>
                                <Button
                                    id='linux'
                                    onClick={this.goToLink}
                                    download
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                >
                                    Get on LINUX
                                    <GetAppIcon className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid justify='center' container alignItems="center">
                            <Grid item xs={10} sm={8} md={4} className={ classes.marginBottomXs }>
                                <Button
                                    id='mac'
                                    onClick={this.goToLink}
                                    download
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                >
                                    Get on MAC
                                    <GetAppIcon className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid justify='center' container alignItems="center">
                            <Grid item xs={10} sm={8} md={4}>
                                <Button
                                    id='windows'
                                    onClick={this.goToLink}
                                    download
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                >
                                    Get on WINDOWS
                                    <GetAppIcon className={classes.rightIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={10} md={5} item>
                        <Grid container justify="center" alignItems="center">
                            <img src={downloadPicture} alt='download' className={classes.downloadPicture}/>
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