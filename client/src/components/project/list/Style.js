export const styles = theme => ({
    listArea: {
        margin: theme.spacing.unit * 1,
        display: 'flex',
        padding:theme.spacing.unit * 1,           
        //whiteSpace: `nowrap`,
        //overflowY: `auto`,
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
        minHeight : `100px`,
        justifyContent: `center`,
        textAlign: `center`,
        
        
    },
    listTitle: {
        textAlign:`left`,
        color : `black`,
        backgroundColor:'#e4e4e4',
        border:`1px solid grey`,
        fontWeight: `lighter`,
        wordBreak: `break-all`
    },
    buttonList:{
        marginTop:`15px`,
        marginLeft:`30px`
    },
    button:{
        fontSize: '11px',
        color: 'grey'
    },
    dropSpace:{
        padding:'10px',
        minHeight:`20px`
    },
    textField:{
        marginLeft:theme.spacing.unit,
        marginRight:theme.spacing.unit,
    },
    dialogBox:{
        marginLeft:theme.spacing.unit,
    },
    badge:{
        left:'0'
    },
    validEditTitle:{
        color : 'green',
    }
});