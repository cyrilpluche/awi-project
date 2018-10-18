import React, {Component} from 'react';
import { Header, Footer } from './layouts'
import { Signin } from './signin/Signin'

import Grid from '@material-ui/core/Grid';
import Style from './styles/Style'
import Paper from '@material-ui/core/Paper'

export default class extends Component {
    render () {
        return (
            <div>
                <Header/>

                <Signin/>

                <Footer/>
            </div>
        )
    }
}