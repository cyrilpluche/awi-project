export const styles = theme => ({
    projectBody: {
        fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`
        
    },
    projectHeader: {
        marginTop: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 4,
        alignText: `left`,
             
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

})