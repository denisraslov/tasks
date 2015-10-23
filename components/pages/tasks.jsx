var React = require('react'),
    Reflux = require('reflux'),
    tasksActions = require('./../../actions/tasks'),
    tasksStore = require('./../../stores/tasks'),
    Calendar = require('./../../components/Calendar.jsx'),
    AdderTask = require('./../../components/AdderTask.jsx'),
    ListTasks = require('./../../components/ListTasks.jsx');

var PageTasks = React.createClass({
    mixins: [Reflux.connect(tasksStore, 'tasks')],
    getInitialState: function() {
        return { tasks: tasksStore.items };
    },
    render: function() {
        return (
            <div className="page page_tasks">

                <Calendar items={this.state.tasks} />

                <div className="page_tasks__tasksListWrap">
                    <AdderTask />
                    <ListTasks items={this.state.tasks} />
                </div>

            </div>
        );
    }
});

module.exports = PageTasks;
