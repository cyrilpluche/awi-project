export const styles = theme => ({
    listArea: {
        margin: theme.spacing.unit * 2,
        display: 'flex',
        padding:theme.spacing.unit * 2,           
        whiteSpace: `nowrap`
             
    },
    list: {
        margin: theme.spacing.unit * 2,
        border:`1px solid lightgrey`,
        borderRadius : `8px`,
        backgroundColor:`white`,
        width: `250px`,
        justifyContent: `center`,
        textAlign: `center`,
        
        
    },
    listTitle: {
        textAlign:`center`,
        border:`1px solid lightgrey`,
        color : `#007bff`,
        padding:theme.spacing.unit * 2,
        margin:`0px`,
        borderRadius : `8px 8px 0 0 `,
        fontWeight: `lighter`,
        wordBreak: `break-all`
    },
    buttonList:{
        marginTop:`15px`,
        marginLeft:`30px`
    },
    button:{
        marginTop:`5px`
    }
});