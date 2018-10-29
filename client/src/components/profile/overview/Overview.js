import React from 'react'
import { connect } from 'react-redux'
import _action from '../../../actions'
import { style } from './Style'
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/core";

class Overview extends React.Component {
    constructor (props) {
        super(props)
        this.generateTextfields = this.generateTextfields.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            member: [
                this.props.member.memberFirstname,
                this.props.member.memberLastname,
                this.props.member.memberPseudo
            ],
            labels: [
                'memberFirstname',
                'memberLastname',
                'memberPseudo'
            ]
        }

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    generateTextfields = () => {
        var textfields = [];
        let index = 0
        const { classes } = this.props;

        console.log(this.state)

        for (let item of this.state.member) {
            console.log(item)
            textfields.push(
                <TextField
                    disabled={true}
                    key={this.state.labels[index]}
                    id={this.state.labels[index]}
                    label={this.state.labels[index]}
                    className={classes.textField}
                    value={item}
                    onChange={this.handleChange(this.state.labels[index])}
                    margin="normal"
                    variant="outlined"
                />
            )
            index += 1
        }
        return textfields
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                {this.generateTextfields()}
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.signin.member
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Overview));