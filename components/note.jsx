var React = require('react');

var ListTasks = React.createClass({
    render: function() {
        return (
            <div className="listTasks">
                <div>{this.props.model.name}</div>
            </div>
        );
    }
});

module.exports = ListTasks;
