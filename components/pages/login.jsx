import React from 'react';
import { browserHistory } from 'react-router';
import store from './../../store.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        browserHistory.push('/tasks');
    }

    render() {
        return (
            <div className="page_unauth__content">
                <div className="page_unauth__panel">
                    <TextField
                        className="page_login__email"
                        hintText="Email"
                        floatingLabelText="Email"
                    />
                    <TextField
                        className="page_login__password"
                        hintText="Password"
                        floatingLabelText="Password"
                    />
                    <div className="page_unauth__buttons">
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
