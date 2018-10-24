import React, {Component} from 'react';
import { Header, Footer } from './layouts'

import Grid from '@material-ui/core/Grid';
import Style from './styles/Style'
import Paper from '@material-ui/core/Paper'

export default class extends Component {
    render () {
        return (
            <div>
                <Header/>

                <Grid container>
                    <Grid item xs>
                        Mehdi
                    </Grid>
                    <Grid item xs>
                        Mehdi
                    </Grid>
                </Grid>

                <Footer/>
            </div>
        )
    }
}