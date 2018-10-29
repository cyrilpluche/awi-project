import React from 'react'
import { connect } from 'react-redux'

class Password extends React.Component {

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