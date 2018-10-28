import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white
            }
        },
    },
    primary: {},
    icon: {},
});

class Menu extends React.Component {
    /* Need to get a property links which is an array of objects
     * object = {label: String, route: String}
     */

    /* Build the item list of the menu */
    buildLinks = () => {
        const {classes} = this.props;
        let menuList = []

        for (let link of this.props.links) {
            menuList.push(
                <Link to={link.route} key={link.label}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.primary}} inset primary={link.label}/>
                    </MenuItem>
                </Link>
            )
        }
        return menuList
    }

    render() {
        return (
            <Paper>
                <MenuList>
                    {this.buildLinks()}
                </MenuList>
            </Paper>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, null)(withStyles(styles)(Menu));