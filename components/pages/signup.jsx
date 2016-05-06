import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { validate } from 'revalidator'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import store from './../../store'
import LinearProgress from 'material-ui/lib/linear-progress'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import DataWrapper from './../../components/DataWrapper.jsx'
import * as actions from './../../actions'

class SignupPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            processing: false
        };
    }

    goToLogin() {
        this.props.dispatch(push('/login'))
    }

    validate() {
        return validate(this.getValues(), {
            properties: {
                name: {
                    type: 'string',
                    required: true,
                    allowEmpty: false
                },
                email: {
                    type: 'string',
                    required: true,
                    format: 'email'
                },
                password: {
                    type: 'string',
                    required: true,
                    allowEmpty: false,
                    minLength: 6
                }
            }
        }).errors;
    }

    getValues() {
        return {
            name: this.getInputValue('name'),
            email: this.getInputValue('email'),
            password: this.getInputValue('password')
        };
    }

    showErrors(errors) {
        var parsedErrors = {};

        errors.forEach(error => {
            parsedErrors[error.property] = _.capitalize(error.property) + ' ' + error.message;
        });

        this.setState({ errors: parsedErrors });
    }

    signup() {
        var errors;

        errors = this.validate();
        if (errors.length) {
            this.showErrors(errors);
            return;
        }

        this.setState({
            processing: true,
            errors: {}
         });

        this.props.dispatch(
            actions.signup(this.getValues())
        );
    }

    getRefNode(ref) {
        return ReactDOM.findDOMNode(this.refs[ref]);
    }

    getInputValue(ref) {
        return this.getRefNode(ref).getElementsByTagName('input')[0].value;
    }

    render() {
        var contentClasses = 'page_unauth__content ' + (this.state.processing ? 'page_unauth__contentProcessing' : '');

        return (
            <div className={contentClasses}>
                <div className="page_unauth__panel">
                    <div className="page_unauth__text">
                        Just one click to start!
                    </div>
                    <TextField
                        ref="name"
                        className="page_unauth__input page_signup__name"
                        hintText="Your name"
                        floatingLabelText="Your name"
                        errorText={this.state.errors.name}
                        disabled={this.state.processing}
                    />
                    <TextField
                        ref="email"
                        className="page_unauth__input page_signup__email"
                        hintText="Your email"
                        floatingLabelText="Your email"
                        errorText={this.state.errors.email}
                        disabled={this.state.processing}
                    />
                    <TextField
                        ref="password"
                        className="page_unauth__input page_signup__password"
                        type="password"
                        hintText="Your password"
                        floatingLabelText="Your password"
                        errorText={this.state.errors.password}
                        disabled={this.state.processing}
                    />
                    <div className="page_unauth__buttons">
                        <FlatButton
                            label="Log in"
                            secondary={true}
                            onClick={this.goToLogin.bind(this)}
                        />
                        <RaisedButton
                            ref="signupButton"
                            label="Sign up"
                            primary={true}
                            disabled={this.state.processing}
                            onClick={this.signup.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state.app
    };
}

export default DataWrapper(connect(select)(SignupPage));
