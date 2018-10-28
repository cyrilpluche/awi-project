import React from 'react'
import { connect } from 'react-redux'
import _action from '../../../actions'

class Password extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>PASSWORD</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(Password);