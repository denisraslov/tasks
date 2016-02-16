var React = require('react'),
    Task = require('./Task.jsx');

var ListTasksCompleted = React.createClass({
    render: function () {
        return (
            <div className="listTasksCompleted listTasks">
                {this.props.items.map(function (task) {
                    if (task.completed) {
                        return <Task key={task.id} model={task} showPopupTask={this.props.showPopupTask}/>;
                    }
                }, this)}
            </div>
        );
    }
});

module.exports = ListTasksCompleted;
