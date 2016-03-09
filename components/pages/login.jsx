import React from 'react';
import { browserHistory } from 'react-router';
import store from './../../store.jsx';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class extends React.Component {
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
