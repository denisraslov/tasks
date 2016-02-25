import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class DialogExampleSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.getModel().completed
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({checked: this.getModel(newProps).completed});
    }

    getModel(newProps = false) {
        if (newProps) {
            if (newProps.model) {
                return newProps.model;
            }
        } else {
            if (this.props.model) {
                return this.props.model;
            }
        }

        return {
            id: 0,
            name: '',
            completed: false
        }
    }

    changeStatusTask() {
        this.props.changeStatusTask(!this.props.model.completed, this.props.model.id);
        this.setState({checked: !this.props.model.completed});
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.onRequestClose}
                />
        ];

        const model = this.getModel();

        return (
            <Dialog
                title={model.name}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                >

                {model.name}
                <input type='checkbox'
                       checked={this.state.checked}
                       onChange={this.changeStatusTask.bind(this)}
                    />
            </Dialog>
        );
    }
}