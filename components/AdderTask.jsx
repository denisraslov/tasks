import React from 'react';
import TextField from 'material-ui/lib/text-field';

var TaskAdder = React.createClass({
    getInitialState: function() {
        return { value: '' };
    },
    render: function() {
        return (
            <div className="taskAdder">
                <TextField
                    className="taskAdder__input"
                    hintText="Type the task"
                    floatingLabelText="New task"
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        );
    },
    onChange: function(e) {
        this.setState({value: e.target.value});
    },
    onKeyUp: function(e) {
        if (e.keyCode == 13) {
            this.props.onAdd(e.target.value);
            this.setState({ value: '' });
        }
     }
});

module.exports = TaskAdder;
