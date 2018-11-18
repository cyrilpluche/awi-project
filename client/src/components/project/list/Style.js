export const styles = theme => ({
    listArea: {
        whiteSpace: `nowrap`,
        overflowY: `auto`,
        flexWrap: 'inherit',
    },
    listHeight: {
        height: '100%'
    },
    list: {
        width: '272px',
        margin: '7px',
        marginRight: 0,
        backgroundColor:`#1e88e5`,
    },
    borderRadius: {
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },
    borderRadiusBottom: {
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
    },
    listTitle: {
        textAlign:`left`,
        color : `black`,
        backgroundColor:'red',
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
        color: 'white',
        backgroundColor: '#155fa0'
    },
    dropSpace:{
        padding:'10px',
        minHeight:`20px`
    },
    textField:{
        marginLeft:theme.spacing.unit,
        marginRight:theme.spacing.unit,
    },
    textField2:{
        padding: 0,
        margin: 0,
        color: 'white'
    },
    dialogBox:{
        marginLeft: theme.spacing.unit,
    },
    badge:{
        left:'0',
        marginRight: theme.spacing.unit * 2,
        color: 'white'
    },
    validEditTitle:{
        color : 'white',
        left:'0',
        marginRight: theme.spacing.unit * 2,
    },
    listElement: {
        marginBottom: 20
    },
    listsGrid: {
        paddingLeft:  theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        maxWidth: '100%'
    },
    listTitle2: {
        backgroundColor: '#155fa0',
    },
    noPadding: {
        padding: 0
    },
    TexfieldGrid: {
        padding: 0,
    },
    cardSlot: {
        backgroundColor: '1e88e5'
    },
    whiteText: {
        color: 'white'
    },
    widthMax: {
        maxWidth: '100%',
        paddingLeft: theme.spacing.unit * 5,
        height: '100%'
    },
    gridList: {
        display: 'grid',
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    buttonAddList: {
        marginBottom: theme.spacing.unit * 5,
    },
    listItem: {
        width: '200px',
    },
    horizontalScrollWrapper: {
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'red',
    }
});