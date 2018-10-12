import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from 'material-icons-react';


export default props =>
    <AppBar position="static" color={"primary"}>
        <Toolbar>
            <IconButton>
                <MaterialIcon icon="home" />
            </IconButton>
        </Toolbar>
    </AppBar>
