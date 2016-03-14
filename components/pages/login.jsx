import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import store from './../../store.jsx';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    goToSignup() {
        browserHistory.push('/signup');
    }

    login() {
        browserHistory.push('/tasks');
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
                    />
                    <TextField
                        className="page_unauth__input page_login__password"
                        hintText="Password"
                        floatingLabelText="Password"
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
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(LoginPage);
