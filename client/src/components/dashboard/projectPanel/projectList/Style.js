export const style = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '2%',
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
        borderRadius: '5px',
        background: '#b3e0ff' // default color will be replaced by image

    },
    add_project_card: {
        maxWidth: 400,
        marginRight: '1.5%',
        borderRadius: '5px',
        background: '#a6a6a6',
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
    }
});


