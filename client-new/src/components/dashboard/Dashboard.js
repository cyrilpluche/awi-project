import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'

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
        console.log(this.props)
        return (
            <div onClick={this.onClick}>
                <p>Hello</p>
                <p>{this.props.project.projectTitle}</p>
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