var React = require('react'),
    Task = require('./Task.jsx');

var ListTasks = React.createClass({
    render: function() {
        return (
            <div className="listTasks">
                {this.props.items.map(function(task) {
                    return <Task key={task.id} model={task} />;
                })}
            </div>
        );
    }
});

module.exports = ListTasks;
