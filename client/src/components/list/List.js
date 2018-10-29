import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "../card/Card";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import { styles } from './Style'


class Listboard extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            name: 'En cours',
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <List
                    className={classes.list}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            En cours
                            <Button  size="small" className={classNames(classes.button, classes.rowRight)}>
                                <MoreVertIcon/>
                            </Button>
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

export default withStyles(styles)(Listboard);
