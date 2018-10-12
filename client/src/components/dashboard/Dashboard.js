import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import MediaCard from "../ui/card"

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
  }
  render(){
    return (
      <div className="Dashboard">
        <MediaCard/>
      </div>
    )
  }
}

export default (inject('store')) (observer(Dashboard));