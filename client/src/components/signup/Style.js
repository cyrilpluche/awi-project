export const style = theme => ({
    layout: {
        height: '100%',
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,

    },
    marginBottom: {
        marginBottom: theme.spacing.unit * 3,
    },
    logo: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2,
    },
    paddingLeft: {
        paddingLeft: theme.spacing.unit,
    },
    paddingRight: {
        paddingRight: theme.spacing.unit,
    }
});