import Typography from "@material-ui/core/Typography/Typography";
import React from "react";

export const style = theme => ({
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    projectArea: {
        whiteSpace: `nowrap`,
        overflowY: `auto`,
        flexWrap: 'inherit',
        display: 'flex',
    },
    project: {
        width: '272px',
        height: '120px',
        margin: '7px',
        //marginRight: 0,
        backgroundColor:`#2c387e`,
        color: 'white',
        padding: theme.spacing.unit,
    },
    favorite: {
        width: '272px',
        height: '120px',
        margin: '7px',
        //marginRight: 0,
        backgroundColor:`#f44336`,
        color: 'white',
        padding: theme.spacing.unit,
    },
    whiteText: {
        color: 'white',
    },
    favoriteButtonIcon: {
        color: '#ffeb3b',
        '&:hover': {
            color: '#ffc107',
        }
    },
    addFavoriteButtonIcon: {
        color: '#ffffe6',
        '&:hover': {
            color: '#ffc107',
        }
    },
    personalBtn: {
        backgroundColor: '#3f51b5'
    },
    favoriteBtn: {
        backgroundColor: '#b41f18',
        color: 'white',
        '&:hover': {
            backgroundColor: '#f6685e',
        }
    },
    projectContainer: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    mainContainer: {
        marginLeft: 30,
        marginRight: 30
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    projectContent: {
        backgroundColor: 'red',
        heigth: '100%',
        width: '100%'
    },
    marginTop: {
        marginTop: 30
    },
    dialogCreation: {
        //margin: '10px'
    },
    textfield: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    maxWidth: {
        maxWidth: '100%'
    }

});


