import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import store from './../../store.jsx';
import LinearProgress from 'material-ui/lib/linear-progress';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import request from 'axios';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false
        };
    }

    goToLogin() {
        browserHistory.push('/login');
    }

    signup() {
        this.setState({ processing: true });

        store.dispatch('SIGN_UP', {
            promise: request.post('localhost:3000/signup', {
                name: this.getInputValue('name'),
                email: this.getInputValue('email'),
                password: this.getInputValue('password')
            })
        });

        //browserHistory.push('/tasks');
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
                {this.state.processing ? <LinearProgress mode="indeterminate"/> : ''}
                <div className="page_unauth__panel">
                    <div className="page_unauth__text">
                        Just one click to start!
                    </div>
                    <TextField
                        rel="name"
                        className="page_unauth__input page_signup__name"
                        hintText="Your name"
                        floatingLabelText="Your name"
                        disabled={this.state.processing}
                    />
                    <TextField
                        rel="email"
                        className="page_unauth__input page_signup__email"
                        hintText="Your email"
                        floatingLabelText="Your email"
                        disabled={this.state.processing}
                    />
                    <TextField
                        rel="password"
                        className="page_unauth__input page_signup__password"
                        hintText="Your password"
                        floatingLabelText="Your password"
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
