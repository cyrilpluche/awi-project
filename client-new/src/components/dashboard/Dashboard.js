import React from 'react'
import { connect } from 'react-redux'
import { fetchProject } from '../../actions'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.onClick()
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
    project: state.project
})

const mapDispatchToProps = {
    onClick: fetchProject
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);