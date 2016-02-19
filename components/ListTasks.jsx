var React = require('react'),
    Task = require('./Task.jsx');

function filterTasks(tasks) {
    var arrayCompleted = [],
        arrayNotCompleted = [];

    tasks.forEach(function (item) {
        item.completed ?
            arrayNotCompleted.push(item) :
            arrayCompleted.push(item);
    });

    return {completed: arrayCompleted, notCompleted: arrayNotCompleted};
}

var ListTasks = React.createClass({
    render: function () {
        var tasks = filterTasks(this.props.items);
        return (
            <div>
                <div className="listTasks">
                    {tasks.completed.map(function (task) {
                        return <Task key={task.id} model={task} showPopup={this.props.showPopup}/>
                    }, this)}
                </div>
                <div className='listTasks'>Completed</div>
                <div className='listTasks'>
                    {tasks.notCompleted.map(function (task) {
                        return <Task key={task.id} model={task} showPopup={this.props.showPopup}/>
                    }, this)}
                </div>
            </div>
        );
    }
});

module.exports = ListTasks;
