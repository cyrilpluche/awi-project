import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom/";

import _helper from '../../../helpers'
import _action from "../../../actions";

// Components
import NotificationList from '../../ui/notification/NotificationList'
import SearchResults from "./searchResults/SearchResults"
import Logo from '../../../public/images/prello-logo-2.png'

// Material UI
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"

// Material UI style
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { style } from './Style'
import { Theme } from "../../ui/palette/Palette";
import { MuiThemeProvider } from "@material-ui/core/es/styles";
import Grid from "@material-ui/core/Grid/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";

class Navbar extends React.Component {

    constructor (props) {
        super(props)

        this.logOff = this.logOff.bind(this);

        // Notifications
        this.updateNotifications = this.updateNotifications.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)

        // Profile
        this.displayComponent = this.displayComponent.bind(this)

        // Others
        this.goToDownloadPage = this.goToDownloadPage.bind(this)
        this.goToWaveIt = this.goToWaveIt.bind(this)

        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            resultsAnchorEl: null,
            right: false,
            showSearchResults: false,
            filterOnlyUnread: false
        };
    }

    componentDidMount () {
        this.props.onGetAllNonArchivedNotifications()
    }

    /* ================= Profile regular ================= */
    handleProfileMenuOpen = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleMenuClose = (event) => {
        this.setState({
            anchorEl: null
        });
        this.displayComponent(event)
        this.handleMobileMenuClose();
    };
    displayComponent = (event) => {
        let route = event.currentTarget.id
        if (route !== '/login' && route !== '') {
            _helper.History.push(route)
        }
    }

    /* ================= Profile mobile ================= */
    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };
    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    /** ================= Notifications ================= */
    toggleDrawer = (side, open) => () => {
        this.updateNotifications()
        this.setState({
            [side]: open,
        });
    }
    updateNotifications () {
        this.props.onUpdateNotifications(this.props.notifications)
    }
    handleFilterChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleFilter = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    /** ================= Search results ================= */
    handleSearchResultsOpen = event => {
        this.setState({showSearchResults: event.target.id === "searchbar" });
    };
    handleSearchResultsClose = () => {
        this.setState({ showSearchResults: false });
    };

    /** ================= Other methods ================= */
    logOff (event) {
        this.handleMenuClose(event)
        this.props.onLogOff()
    }

    goToDownloadPage () {
        this.handleMobileMenuClose()
        _helper.History.push('/download')
    }

    goToWaveIt () {
        this.handleMobileMenuClose()
        _helper.History.push('/schedules')
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl, resultsAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isSearchResultsOpen = Boolean(resultsAnchorEl);

        /** ================= Profile regular ================= */
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                className={classes.openedMenu}
                onClose={this.handleMenuClose}
            >
                <MenuItem id='/profile/overview' onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem id='/login' onClick={this.logOff}>Log off</MenuItem>
            </Menu>
        );

        /** ================= Notifications ================= */
        const renderNotifications = (
            <Drawer
                anchor="right"
                open={this.state.right}
                onClose={this.toggleDrawer('right', false)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer('right', false)}
                >
                    <Grid alignItems='center' justify='center' container>
                        <Grid xs={2} item>
                            <IconButton
                                onClick={this.toggleDrawer('right', false)}
                                color="inherit"
                            >
                                <ChevronLeftIcon color='primary' />
                            </IconButton>
                        </Grid>
                        <Grid xs={8} item>
                            <Button fullWidth color="primary" className={classes.button}>
                                {this.props.notificationsUnread} Notifications
                            </Button>
                        </Grid>
                        <Grid xs={2} item>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <div className={classes.notificationList}>
                        <NotificationList
                            notifications={this.props.notifications}
                            notificationsUnread={this.props.notificationsUnread}
                            unreadFilter={this.state.filterOnlyUnread}
                        />
                    </div>
                    <Divider/>

                    <Button fullWidth color="primary" className={classes.button}>
                        Filters
                    </Button>
                    <Divider/>
                    <Grid justify="center" container>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.filterOnlyUnread}
                                    onChange={this.handleFilter('filterOnlyUnread')}
                                    value="filterOnlyUnread"
                                    color="primary"
                                />
                            }
                            label="Only unread"
                        />
                    </Grid>
                </div>
            </Drawer>
        );

        /* ================= Profile mobile ================= */
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.goToWaveIt.bind(this)}>
                    <IconButton color="secondary">
                        <CalendarTodayIcon />
                    </IconButton>
                    <p>Schedules</p>
                </MenuItem>
                <MenuItem onClick={this.goToDownloadPage.bind(this)}>
                    <IconButton color="primary">
                        <GetAppIcon />
                    </IconButton>
                    <p>Download</p>
                </MenuItem>
                <MenuItem onClick={this.toggleDrawer('right', true)}>
                    <IconButton color="primary">
                        <Badge badgeContent={this.props.notificationsUnread} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton coloar="primary">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        /* ================= Search results ================= */
        const renderSearchResults = (
            <Menu
                anchorEl={resultsAnchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={isSearchResultsOpen}
                onClose={this.handleSearchResultsClose}
            >
                <SearchResults/>
            </Menu>
        );

        /* ================= TOOL BAR ================= */
        /* ================= TOOL BAR ================= */
        return (
            <MuiThemeProvider theme={Theme.classic}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Link to='/home'>
                                <IconButton className={classes.menuButton} color="inherit">
                                    <img src={Logo} width={30} color="secondary" alt='prello logo' />
                                </IconButton>
                            </Link>

                            <div
                                className={classes.search}
                            >
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>

                                <SearchResults/>

                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.goToWaveIt}
                                    color="inherit"
                                >
                                    <CalendarTodayIcon />
                                </IconButton>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.goToDownloadPage}
                                    color="inherit"
                                >
                                    <GetAppIcon />
                                </IconButton>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.toggleDrawer('right', true)}
                                    color="inherit"
                                >
                                    <Badge badgeContent={this.props.notificationsUnread} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderSearchResults}
                    {renderMobileMenu}
                    {renderNotifications}
                    { this.state.showSearchResults ? <SearchResults/> : null }
                </div>
            </MuiThemeProvider>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.navbar.notifications,
    notificationsUnread: state.navbar.notificationsUnread,
    notificationsUnarchived: state.navbar.notificationsUnarchived

})

const mapDispatchToProps = {
    onLogOff: _action.navbarAction.logOff,
    onGetAllNonArchivedNotifications: _action.navbarAction.getAllNonArchivedNotifications,
    onUpdateNotifications: _action.navbarAction.updateNotifications,
    onShowOnlyUnread: _action.notificationAction.showOnlyUnreadAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Navbar));