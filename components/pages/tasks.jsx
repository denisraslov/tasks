var React = require('react'),
    store = require('./../../store'),
    Calendar = require('./../../components/Calendar.jsx'),
    AdderTask = require('./../../components/AdderTask.jsx'),
    ListTasks = require('./../../components/ListTasks.jsx'),
    PopupTask = require('./../../components/PopupTask.jsx');

function filterTasks(tasks) {
    var completedTasks = [],
        activeTasks = [];

    tasks.forEach(function (item) {
        item.completed ?
            completedTasks.push(item) :
            activeTasks.push(item);
    });

    return {completedTasks: completedTasks, activeTasks: activeTasks};
}

var PageTasks = React.createClass({
    getInitialState: function () {
        return {
            tasks: store.getState().tasks
        };
    },
    componentDidMount: function () {
        var self = this;

        store.subscribe(function () {
            self.setState({tasks: store.getState().tasks});
        });
    },
    showPopup: function (task) {
        this.setState({popupModel: task});
    },
    onPopupClose: function () {
        this.setState({popupModel: null});
    },
    render: function () {
        var objTasks = filterTasks(this.state.tasks);

        return (
            <div className="page__content page_tasks__content">

                <Calendar items={this.state.tasks}/>

                <div className="page_tasks__tasksListWrap">
                    <AdderTask onAdd={this.addTask}/>
                    <ListTasks title='Active'
                               items={objTasks.activeTasks}
                               showPopup={this.showPopup}
                        />
                    <ListTasks title='Completed'
                               items={objTasks.completedTasks}
                               showPopup={this.showPopup}
                        />
                </div>

                <PopupTask
                    model={this.state.popupModel}
                    open={!!this.state.popupModel}
                    onRequestClose={this.onPopupClose}
                    changeStatusTask={this.changeStatusTask}
                    />
            </div>
        );
    },
    addTask: function (name) {
        store.dispatch({type: 'ADD_TASK', data: {name: name}})
    },
    changeStatusTask: function (status, id) {
        store.dispatch({type: 'CHANGE_STATUS_TASK', data: {status: status, id: id}});
    }
});

module.exports = PageTasks;
