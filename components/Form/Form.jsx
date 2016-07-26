import React from 'react'
import ReactDOM from 'react-dom'
import { validate } from 'revalidator'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

import CSSModules from 'react-css-modules'
import styles from './Form.css'

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ processing: nextProps.processing });
    }

    onSecondaryButtonClick() {
        this.props.onSecondaryButtonClick();
    }

    validate() {
        return validate(this.getValues(), {
            properties: this.props.validationProperties
        }).errors;
    }

    getValues() {
        const self = this;
        let values = {};

        this.props.fields.forEach((field) => {
            let name = field.name;
            values[name] = self.getInputValue(name);
        });

        return values;
    }

    showErrors(errors) {
        var parsedErrors = {};

        errors.forEach(error => {
            parsedErrors[error.property] = _.capitalize(error.property) + ' ' + error.message;
        });

        this.setState({ errors: parsedErrors });
    }

    submit() {
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

        this.props.onSubmit(this.getValues());
    }

    getRefNode(ref) {
        return ReactDOM.findDOMNode(this.refs[ref]);
    }

    getInputValue(ref) {
        return this.getRefNode(ref).getElementsByTagName('input')[0].value;
    }

    render() {
        const self = this;

        return (
                <div styleName="form">
                    <div styleName="text">
                        {this.props.text}
                    </div>

                    {
                        self.props.fields.map((field, index) => {
                            return self.renderField(field, index);
                        })
                    }

                    <div styleName="buttons">
                        <FlatButton
                            label={this.props.secondaryButtonLabel}
                            secondary={true}
                            onClick={this.onSecondaryButtonClick.bind(this)}
                        />
                        <RaisedButton
                            label={this.props.submitButtonLabel}
                            primary={true}
                            disabled={this.state.processing}
                            onClick={this.submit.bind(this)}
                        />
                    </div>
                </div>
        );
    }

    renderField(field, index) {
        let style = {
            display: 'block',
            width: '100%'
        };

        if (index > 0) {
            style.marginTop = '-8px';
        }

        return <TextField
            hintText={field.label}
            floatingLabelText={field.label}
            ref={field.name}
            type={field.type || 'Text'}
            errorText={this.state.errors[name]}
            disabled={this.state.processing}
            style={style}
        />;
    }
}

export default CSSModules(Form, styles);
