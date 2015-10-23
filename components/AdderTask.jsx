var React = require('react'),
    tasksActions = require('./../actions/tasks'),
    tasksStore = require('./../stores/tasks');

var TaskAdder = React.createClass({
    getInitialState: function() {
        return { value: '' };
    },
    render: function() {
        return (
            <div className="taskAdder">
                <input type="text"
                       placeholder="Type the task..."
                       value={this.state.value}
                       onChange={this.onChange}
                       onKeyUp={this.onKeyUp} />
            </div>
        );
    },
    onChange: function(e) {
        this.setState({value: e.target.value});
    },
    onKeyUp: function(e) {
        if (e.keyCode == 13) {
            tasksActions.insert(e.target.value);
            this.setState({ value: '' });
        }
     }
});

module.exports = TaskAdder;
