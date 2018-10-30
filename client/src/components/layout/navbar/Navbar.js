import { connect } from 'react-redux'
import { style } from './Style'
import NotificationList from '../../ui/notification/NotificationList'
import _helper from '../../../helpers'

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom/";
import { MuiThemeProvider } from "@material-ui/core/es/styles";
import { Theme } from "../../ui/palette/Palette";
import _action from "../../../actions";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";

class Navbar extends React.Component {

    constructor (props) {
        super(props)
        this.logOff = this.logOff.bind(this);
        this.updateNotification = this.updateNotification.bind(this)
        this.updateNotifications = this.updateNotifications.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.displayComponent = this.displayComponent.bind(this)

        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            right: false,
            updatedNotifications: []
        };
    }

    componentDidMount () {
        this.props.onGetAllNonArchivedNotifications()
    }

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

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    displayComponent = (event) => {
        let route = event.currentTarget.id
        if (route !== '/login') {
            _helper.History.push(route)
        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({showOnlyUnread: this.props.notificationsUnarchived.length > 0})

        this.updateNotifications()
        this.setState({
            [side]: open,
        });
    };

    logOff (event) {
        this.handleMenuClose(event)
        this.props.onLogOff()
    }

    updateNotification (item) {
        let index = this.state.updatedNotifications.indexOf(item)
        if (index === -1) this.state.updatedNotifications.push(item)
    }

    updateNotifications () {
        if (this.state.updatedNotifications.length > 0) {
            this.props.onUpdateNotifications(this.state.updatedNotifications)
            this.setState({updatedNotifications: []})
        }
    }

    handleFilterChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


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
                    <Button fullWidth color="primary" className={classes.button}>
                        {this.props.notificationsUnread} Notifications
                    </Button>
                    <Divider/>
                    <div className={classes.notificationList}>
                        <NotificationList
                            notifications={this.props.notifications}
                            notificationsUnread={this.props.notificationsUnread}
                            updateNotification={this.updateNotification}
                        />
                    </div>
                    <Divider/>

                    <Button fullWidth color="primary" className={classes.button}>
                        Filters
                    </Button>
                </div>
            </Drawer>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary" >
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <MuiThemeProvider theme={Theme.classic}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Link to='/home'>
                                <IconButton className={classes.menuButton} color="inherit">
                                    <HomeIcon color="secondary" />
                                </IconButton>
                            </Link>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <MailIcon />
                                    </Badge>
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
                    {renderMobileMenu}
                    {renderNotifications}
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