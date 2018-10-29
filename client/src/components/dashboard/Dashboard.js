import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import List from "../list/List";

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.onClick({
            projectTitle: 'Awi'
        })
    }

    render() {
        return (
            <div onClick={this.onClick}>
                <p>Hello</p>
                <p>{this.props.project.projectTitle}</p>
                <List content = {{id:1}}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.dashboard.project
})

const mapDispatchToProps = {
    onClick: _action.dashboardAction.fetchProject
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);