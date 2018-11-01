import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import connect from "react-redux/es/connect/connect";

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
     * object = {label: String, route: String, icon: <Icon/>}
     */

    constructor (props) {
        super(props)
        this.displayComponent = this.displayComponent.bind(this);
    }

    displayComponent = (event) => {
        let route = event.currentTarget.id
        this.props.history.push(route)
    }

    /* Build the item list of the menu */
    buildLinks = () => {
        const {classes} = this.props;
        let menuList = []

        for (let link of this.props.links) {
            menuList.push(
                <MenuItem id={link.route} className={classes.menuItem} key={link.label} onClick={this.displayComponent}>
                    <ListItemIcon className={classes.icon}>
                        {link.icon}
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.primary}} inset primary={link.label}/>
                </MenuItem>
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