export const styles = theme => ({
    card: {
        maxWidth: 300,
        margin: 5
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    marginCard: {
        margin: 5
    },
    row: {
        display: 'flex',
        justifyContent: 'right',
        margin: 5
    },
    rowRight: {
        display: 'flex',
        justifyContent: 'right',
        float: 'right'
    },
    sizeButtonModal: {
        margin: 5,
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px'
    }
});