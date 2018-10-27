import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styles } from './Style'
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Modal from '@material-ui/core/Modal';


class Cardboard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            open: false,
        };
    }


    rand = () =>{
        return Math.round(Math.random() * 20) - 10;
    };

    getModalStyle = () =>{
        const top = 50 + this.rand();
        const left = 50 + this.rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                        Text in a modal
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </div>
            </Modal>
            <Card className={classes.card} >
                <CardActionArea onClick={this.handleOpen}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.content.title}
                        </Typography>
                        <Typography component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>
        );
    }
}

Cardboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const CardboardWrapped = withStyles(styles)(Cardboard);

export default CardboardWrapped;