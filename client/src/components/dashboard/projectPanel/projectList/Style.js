export const style = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '2%',
        marginBottom: '3%',
        paddingLeft: '4%',
        textAlign: 'center'
    },
    title: {
        textAlign: 'left',
        color: '#4d4d4d'
    },
    default_card: {
        maxWidth: 400,
        marginRight: '1.5%',
        marginBottom: '3%',
        borderRadius: '5px',
        background: '#b3e0ff' // default color will be replaced by image

    },
    add_project_card: {
        maxWidth: 400,
        marginRight: '2.5%',
        borderRadius: '5px',
        background: '#d9d9d9',
        opacity: 0.8
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    favoriteButtonIcon: {
        color: '#ffd11a',
        float: 'left',
        '&:hover': {
            color: '#ffffe6',
        }
    },
    addFavoriteButtonIcon: {
        color: '#ffffe6',
        float: 'right',
        '&:hover': {
            color: '#ffd11a'
        }
    },
    Icon: {
        fontSize: '22px',
        '&:hover': {
            fontSize: '24px'
        }
    },

    addIcon: {
        color: '#808080',
        fontSize: '28px',
        '&:hover': {
            fontSize: '36px'
        }
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },

    // New CSS version
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridTitle: {
        color: '#fff',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    projectLayout: {
        marginBottom: theme.spacing.unit * 5
    }
});


