export const style = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#f2f2f2',
        marginLeft: '5%',
        borderRadius: '5px'
       // backgroundColor: theme.palette.background.paper,
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


