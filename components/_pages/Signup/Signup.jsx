import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { validate } from 'revalidator'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import store from './../../../store'
import InitDataWrapper from './../../_containers/InitData.jsx'
import PageWrapper from './../../_containers/Page.jsx'
import * as actions from './../../../actions'
import Form from './../../Form/Form.jsx'

class SignupPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.error) {
            this.setState({ error: nextProps.data.error });
        }
    }

    getFields() {
        return [
            {
                name: 'name',
                label: 'Your name'
            },
            {
                name: 'email',
                label: 'Your email'
            },
            {
                name: 'password',
                type: 'password',
                label: 'Your password'
            }
        ];
    }

    getFieldsValidationProperties() {
        return {
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
        };
    }

    goToLogin() {
        this.props.dispatch(push('/login'))
    }

    signup(values) {
        this.props.dispatch(
            actions.signup(values)
        );
    }

    render() {
        return (
            <div>
                <Form
                    text='Just one click to start!'
                    fields={this.getFields()}
                    fieldsValidationProperties={this.getFieldsValidationProperties()}
                    submitButtonLabel='Sign up'
                    secondaryButtonLabel='Log in'
                    onSubmit={this.signup.bind(this)}
                    onSecondaryButtonClick={this.goToLogin.bind(this)}
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
        connect(select)(SignupPage)
    )
);
