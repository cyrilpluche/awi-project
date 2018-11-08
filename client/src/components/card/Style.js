export const styles = theme => ({
    card: {
        backgroundColor: '#FFFAF0',
        padding: theme.spacing.unit,
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
        width: theme.spacing.unit * 80,
        backgroundColor: '#FFFAF0',
        //backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        display: 'table',
        clear: 'both'
    },
    marginCard: {
        marginTop: 10,
        marginLeft: 10
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
    },
    column: {
        float: 'left',
        width: '70%',
        padding: '10px',
        margin: 5,
    },
    button: {
        margin: theme.spacing.unit,
    },
    divider:{
        margin: 15
    },
    buttonIcon:{
        width: 43,
        height: 43,
        marginTop: 5,
        display: 'block',
        marginLeft:  'auto',
        marginRight: 0
    },
    buttonLabel:{
        height: '5%',
        margin: 10,
        backgroundColor: 'yellow',
        fontWeight: 'bolt'
    },
    editButton:{
        height: '5%',
        display: 'block',
        marginTop: 15,
        marginLeft:  'auto',
        marginRight: 0,
        backgroundColor: 'Transparent',
        border: 'none'
    },
    textArea:{
        width: '100%'
    },
    buttonModal:{
        marginLeft: 12,
        marginBottom: 10,
        width: '23%'
    },
    comments:{
        display: 'flex',
        width:'100%'
    },
    iconComments:{
        marginLeft:  15,
        marginRight: 0,
        display: 'block'
    }
});