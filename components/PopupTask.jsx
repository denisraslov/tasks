import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class DialogExampleSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.onRequestClose}
            />
        ];

        return (
            <Dialog
                title={this.props.model ? this.props.model.name : ''}
                actions={actions}
                modal={false}
                open={this.props.open}
               onRequestClose={this.props.onRequestClose}
            >
                The actions in this window were passed in as an array of React objects.
            </Dialog>
        );
    }
}