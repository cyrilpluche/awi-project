import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        
        
    },
});

class Card extends Component{

    

    render() {
        const {classes} = this.props
        return (
            <div className={classes.progress}>{this.props.card.cardContent}</div>
            
        )
    }
}

export default withStyles(styles)(Card)