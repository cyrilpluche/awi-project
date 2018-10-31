import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from "../card/Card";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { styles } from './Style'

const optionsEditMenu = [
    'Changer le titre',
    'Supprimer la liste',
];

const ITEM_HEIGHT = 48;

class Listboard extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            title: 'En cours',
            anchorEl: null,
            cards: [{id: 1}, {id: 1}]
        };
    }

    addCard = () => {
        this.setState({
            cards: [
                ...this.state.cards, // previous items
                { id: 1} // plus the new one
            ]
        });
    };

    // updateTitle = (e) => {
    //     this.setState({
    //         title: "meg"
    //     });
    // };

    handleClickEditMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseEditMenu = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { classes } = this.props;
        const { anchorEl, title } = this.state;
        const isOpenEditMenu = Boolean(anchorEl);

        const EditMenu = (
            <div className={classNames(classes.button, classes.rowRight)}>
                <Button
                    aria-label="More"
                    aria-owns={isOpenEditMenu ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    size="small"
                    className={classNames(classes.button, classes.rowRight)}
                    //onClick={this.updateTitle()}
                    //{console.log(event)}
                    onClick={this.handleClickEditMenu}
                >
                    <MoreVertIcon/>
                </Button>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={isOpenEditMenu}
                    //onClose={this.handleCloseEditMenu()}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleCloseEditMenu}>Modifier le titre</MenuItem>
                    <MenuItem onClick={this.handleCloseEditMenu}>Supprimer la liste</MenuItem>
                    {/*{optionsEditMenu.map(option => (*/}
                    {/*<MenuItem key={option} selected={option === 'Supprimer la liste'} onClick={this.handleCloseEditMenu()}>*/}
                    {/*{option}*/}
                    {/*</MenuItem>*/}
                    {/*))}*/}
                </Menu>
            </div>
        )

        return (
            <div>
                <List
                    className={classes.list}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            {title}
                            {EditMenu}
                        </ListSubheader>}
                >

                        {this.state.cards.map((c) =>
                            <ListItem button className={classes.listItem}>
                                <Card content = {{id:1}}/>
                            </ListItem>
                        )}
                    <ListItem button onClick={this.addCard} className={classes.listItem}>
                        <ListItemText inset primary="+ Add a new card" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

Listboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    list: state.cards
})

//export default withStyles(styles)(Listboard);
export default connect(mapStateToProps)(withStyles(styles)(Listboard));

