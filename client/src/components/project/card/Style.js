export const styles = theme => ({
    card: {
        margin: theme.spacing.unit * 1,
        border:`1px solid lightgrey` ,
        borderRadius: '4px',
        padding:theme.spacing.unit * 2,
        maxWidth: `250px`,
        wordWrap: `break-word`,
        whiteSpace: `normal`,
        backgroundColor:'white'
        
    },
    typography: {
        useNextVariants: true,
      },
    paragraph:{
        wordWrap: `break-word`
    }
});