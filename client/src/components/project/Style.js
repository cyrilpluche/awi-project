export const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`,
        minHeight: '85%',
    },
    fullHeight: {
        minHeight: '85'
    },
    projectHeader: {
        marginTop: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 3,
        alignText: `left`,
        width: '100%'

    },
    projectTitle: {
        marginTop: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 2,
        alignText: `left`,
        color:`#3f51b5`

    },
    button: {
        margin: theme.spacing.unit,

    },
    leftIcon:{
        marginRight: theme.spacing.unit,
    },
    rightIcon:{
        marginLeft: theme.spacing.unit,
        cusor:`pointer`
    },
    validIcon:{
        marginLeft: theme.spacing.unit,
        color:`#6bb53f`,
        paddingTop: `25px`
    },
    cancelIcon:{
        color:`red`,
        paddingTop: `25px`
    },
    drawer:{
        width:`250px`
    },
    drawerList: {
        overflowY: 'scroll',
        maxHeight: theme.spacing.unit * 60
    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: 'left',
        color: 'black',
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        border : `1px solid lightgrey`,
        margin: '10px',
        borderRadius:'10px'
    },
    restoreButton: {
        color: 'green',
        border : `1px solid green`,
    },
    expandPanel:{
        width: '100%',
    },
    widthMax: {
        maxWidth: '100%'
    }

})