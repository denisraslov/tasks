var React = require('react'),
    store = require('./../../store'),
    Calendar = require('./../../components/Calendar.jsx'),
    AdderTask = require('./../../components/AdderTask.jsx'),
    ListTasks = require('./../../components/ListTasks.jsx');

var PageTasks = React.createClass({
    getInitialState: function() {
        return { tasks: store.getState().tasks };
    },
    componentDidMount: function() {
        var self = this;

        store.subscribe(function() {
            self.setState({ tasks: store.getState().tasks });
        });
    },
    render: function() {
        return (
            <div className="page__content page_tasks__content">

                <Calendar items={this.state.tasks} />

                <div className="page_tasks__tasksListWrap">
                    <AdderTask onAdd={this.addTask} />
                    <ListTasks items={this.state.tasks} />
                </div>

            </div>
        );
    },
    addTask: function(name) {
        store.dispatch({ type: 'ADD_TASK', data: { name: name } })
    }
});

module.exports = PageTasks;
