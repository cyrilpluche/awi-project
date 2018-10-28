import React from 'react'
import { connect } from 'react-redux'
import _action from '../../../actions'

class Overview extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>OVERVIEW</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(Overview);