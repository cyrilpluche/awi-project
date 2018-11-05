export const styles = theme => ({
    listArea: {
        margin: theme.spacing.unit * 2,
        display: 'flex',
        padding:theme.spacing.unit * 2,           
        //whiteSpace: `nowrap`,
        overflowY: `auto`,
        //position: `fixed`,
        left: `0`, 
        right: `0`
             
    },
    list: {
        margin: theme.spacing.unit * 2,
        borderRadius: 4,
        backgroundColor: theme.palette.grey[300],
        width: 280,
        maxWidth: 280,
        minWidth : 200,
        justifyContent: `center`,
        textAlign: `center`,
    },
    listTitle: {
        borderRadius: 4,
        textAlign:`center`,
        fontSize: 18,
        margin:`0px`,

    },
    buttonList:{
        marginTop:`15px`,
        marginLeft:`30px`
    },
    dropSpace:{
        padding:'10px',
        minHeight:`100px`
    },
    textField:{
        marginLeft:theme.spacing.unit,
        marginRight:theme.spacing.unit,
    },
    dialogBox:{
        marginLeft:theme.spacing.unit,
    },

    button: {
        minWidth: 32,
        minHeight: 32,
        width: 45,
        height: 45
    },

    rowRight: {
        display: 'flex',
        justifyContent: 'center',
        float: 'right',
    },

    listItem: {
        paddingRight: 5,
        paddingLeft: 5,
    }
});