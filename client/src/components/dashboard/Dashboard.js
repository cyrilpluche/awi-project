import React from 'react';
import { connect } from 'react-redux';
import ProjectAction from '../../actions/project_action'

class SignUpForm extends React.Component {
    constructor (props) {
        super(props)
        this.onFindOneProject = this.onFindOneProject.bind(this);
    }

    onFindOneProject () {
        this.props.onFindOneProject()
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div onClick={this.onFindOneProject}>
                    Wohou
                </div>
                {this.props.project.projectTitle}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        project: state.dashboard.project
    }
}
const mapActionToProps = {
    onFindOneProject: ProjectAction.findOneProject
};

export default connect(mapStateToProps, mapActionToProps)(SignUpForm);