import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({model: newProps.model});
    }

    changeTaskStatus() {
        this.props.changeTaskStatus(this.state.model.id);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.onRequestClose}
                />
        ]
        return (
            <Dialog
                title={this.state.model.name}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                >

                <Checkbox label="Completed"
                          checked={this.state.model.completed}
                          onCheck={this.changeTaskStatus.bind(this)}
                    />
            </Dialog>
        );
    }
}