var React = require('react'),
    Task = require('./Task.jsx');

var ListTasks = React.createClass({
    render: function () {
        return (
            <div>
                <div className="listTasks">
                    <div>{this.props.title}</div>
                    {this.props.items.map(function (task) {
                        return <Task key={task.id}
                                     model={task}
                                     showPopup={this.props.showPopup}
                            />
                    }, this)}
                </div>
            </div>
        );
    }
});

module.exports = ListTasks;
