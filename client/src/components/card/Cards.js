import Card from "./Card";

import React, { Component } from 'react';

class Cards extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <Card content = {{id:1}}/>
        );
    }

}


export default Cards;
