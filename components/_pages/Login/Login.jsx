import React from 'react'
import ReactDOM from 'react-dom'
import { validate } from 'revalidator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import store from './../../../store'
import InitDataWrapper from './../../_containers/InitData.jsx'
import PageWrapper from './../../_containers/Page.jsx'
import * as actions from './../../../actions'
import Form from './../../Form/Form.jsx'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    goToSignup() {
        this.props.dispatch(actions.redirect('/signup'));
    }

    login(values) {
        this.props.dispatch(
            actions.login(values)
        );
    }

    getFields() {
        return [
            {
                name: 'email',
                label: 'Email'
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password'
            }
        ];
    }

    getFieldsValidationProperties() {
        return {
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
       };
    }

    render() {
        return (
            <div>
                <Form
                    text='Hi there!'
                    fields={this.getFields()}
                    fieldsValidationProperties={this.getFieldsValidationProperties()}
                    submitButtonLabel='Log in'
                    secondaryButtonLabel='Sign up'
                    onSubmit={this.login.bind(this)}
                    onSecondaryButtonClick={this.goToSignup.bind(this)}
                    processing={!!this.props.error}
                />
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

export default PageWrapper(
    InitDataWrapper(
        connect(select)(LoginPage)
    )
);
