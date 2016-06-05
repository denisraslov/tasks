import React from 'react'
import ReactDOM from 'react-dom'
import { validate } from 'revalidator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import store from './../../store'
import LinearProgress from 'material-ui/lib/linear-progress'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import InitDataWrapper from './../../components/containers/InitData.jsx'
import PageWrapper from './../../components/containers/Page.jsx'
import * as actions from './../../actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.error) {
            this.setState({ processing: false });
        }
    }

    goToSignup() {
        this.props.dispatch(actions.redirect('/signup'));
    }

    validate() {
        return validate(this.getValues(), {
            properties: {
                email: {
                    type: 'string',
                    required: true,
                    format: 'email'
                },
                password: {
                    type: 'string',
                    required: true,
                    allowEmpty: false
                }
            }
        }).errors;
    }

    getValues() {
        return {
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

    login() {
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
            actions.login(this.getValues())
        );
    }

    loginEnter(e) {
        if(e.keyCode == 13) {
          this.login();
        }
    }
    getRefNode(ref) {
        return ReactDOM.findDOMNode(this.refs[ref]);
    }

    getInputValue(ref) {
        return this.getRefNode(ref).getElementsByTagName('input')[0].value;
    }

    render() {
        return (
            <div className="page_unauth__content">
                <div className="page_unauth__panel">
                    <div className="page_unauth__text">
                        Hi there!
                    </div>
                    <TextField
                        className="page_unauth__input page_login__email"
                        hintText="Email"
                        floatingLabelText="Email"
                        ref="email"
                        errorText={this.state.errors.email}
                        disabled={this.state.processing}
                    />
                    <TextField
                        className="page_unauth__input page_login__password"
                        type="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        ref="password"
                        errorText={this.state.errors.password}
                        disabled={this.state.processing}
                        onKeyDown={this.loginEnter.bind(this)}
                    />
                    <div className="page_unauth__buttons">
                        <FlatButton
                            label="Sign up"
                            secondary={true}
                            onClick={this.goToSignup.bind(this)}
                        />
                        <RaisedButton
                            label="Log in"
                            primary={true}
                            disabled={this.state.processing}
                            onClick={this.login.bind(this)}
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

export default PageWrapper(InitDataWrapper(connect(select)(LoginPage)));
