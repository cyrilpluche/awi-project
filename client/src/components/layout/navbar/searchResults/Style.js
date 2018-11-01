export const style = theme => ({
    root: {
        flexGrow: 1,
        //height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 2,
        opacity: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),

        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    labelSearchTitle: {
        paddingLeft: theme.spacing.unit * 2
    },
    highlight: {
        // WARNING : Trigger a warning in the console. Need to find another way to hover result's list.
        '&:hover:not($disabled):not($error):not($focused):before': {
            //backgroundColor: '#e72b34',
            borderBottomColor: '#cdcde7',
        },
    }
});


