export const style = theme => ({
    layout: {
        height: '100%',
        margin: 0
    },
    textfield: {
        marginTop: 0
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    rightLayout: {
        height: '100%',
        padding: theme.spacing.unit * 2,
    },
    leftLayout: {
        height: '100%',
        backgroundColor: '#2c387e',
        padding: theme.spacing.unit * 2,
    },
    errorLabel: {
        marginTop: theme.spacing.unit * 2,
    },
    cardPresentation: {
        marginTop: 200
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    typography: {
        useNextVariants: true,
    },
    paddingSide: {
        paddingLeft: theme.spacing.unit * 23,
        paddingRight: theme.spacing.unit * 23,
    },
    xsMarginBottom: {
        marginBottom: theme.spacing.unit * 5
    },
    logo: {
        marginRight: 'auto',
        marginLeft:'auto'
    }
});