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
        border:`1px solid lightgrey`,
        borderRadius : `4px`,
        backgroundColor:`white`,
        width: `200px`,
        minWidth : `200px`,
        //minHeight : `200px`,
        justifyContent: `center`,
        textAlign: `center`,
        
        
    },
    listTitle: {
        textAlign:`center`,
        color : `black`,
        backgroundColor:'#e4e4e4',
        padding:theme.spacing.unit * 2,
        margin:`0px`,
        fontWeight: `lighter`,
        wordBreak: `break-all`
    },
    buttonList:{
        marginTop:`15px`,
        marginLeft:`30px`
    },
    button:{
        marginTop:`5px`
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
    }
});