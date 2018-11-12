import { createMuiTheme } from '@material-ui/core/styles';

const  classic = createMuiTheme({
    palette: {
        secondary: {
            main: '#ffc50a'
        }
    },
});

const  successWarningError = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50'
        }
    },
});

export const Theme = {
    classic,
    successWarningError
}