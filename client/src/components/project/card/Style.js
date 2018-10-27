export const styles = theme => ({
    card: {
        margin: theme.spacing.unit * 1,
        border:`1px solid lightgrey` ,
        padding:theme.spacing.unit * 2,
        maxWidth: `250px`,
        wordWrap: `break-word`,
        whiteSpace: `normal`
        
    },
    typography: {
        useNextVariants: true,
      },
    paragraph:{
        wordWrap: `break-word`
    }
});