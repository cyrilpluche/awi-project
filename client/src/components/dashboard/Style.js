export const style = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'grey'
    },
    leftLayout: {
        height: '100%',
        padding: theme.spacing.unit * 2,
    },
    layout: {
        //height: '100%',
        margin: 0,
        //backgroundColor: '#f0f0f5',
        /*borderRadius: '5px',
        backgroundImage: `url(${backgroundimage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat'*/
    },
    rightLayout: {
        //height: '100%',
        padding: theme.spacing.unit * 2,
    },
    xsMarginBottom: {
        marginBottom: theme.spacing.unit * 5
    },
    errorMsg: {
        backgroundColor: '#ffb3b3',
        border: 'solid 5px #ff0000'
    },
    subLayout: {
        paddingRight: theme.spacing.unit * 5,
        paddingLeft: theme.spacing.unit * 5

    }
});


