import React, {Component} from 'react';
import { Header, Footer } from './layouts'
import Grid from '@material-ui/core/Grid';


export default class extends Component {
    render () {
        return (
            <div>
                <Header/>

                <Footer/>
            </div>
        )
    }
}