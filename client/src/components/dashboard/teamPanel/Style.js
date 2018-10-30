import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export const style = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: '#b3cccc',
        },
    },
});


