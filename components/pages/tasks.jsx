var React = require('react'),
    store = require('./../../store'),
    Calendar = require('./../../components/Calendar.jsx'),
    AdderTask = require('./../../components/AdderTask.jsx'),
    ListTasks = require('./../../components/ListTasks.jsx'),
    PopupTask = require('./../../components/PopupTask.jsx');

var PageTasks = React.createClass({
    getInitialState: function () {
        return {
            tasks: store.getState().tasks,
            popupModel: {}
        };
    },
    componentDidMount: function () {
        var self = this;

        store.subscribe(function () {
            self.setState({tasks: store.getState().tasks});
        });
    },
    showPopupTask: function (event) {
        var id = event.target.id.substr(4);
        this.setState({popupModel: this.state.tasks[id - 1]});
    },
    render: function () {
        return (
            <div className="page__content page_tasks__content" onClick={this.showPopup}>

                <Calendar items={this.state.tasks}/>

                <div className="page_tasks__tasksListWrap">
                    <AdderTask onAdd={this.addTask}/>
                    <ListTasks items={this.state.tasks} showPopupTask={this.showPopupTask}/>
                </div>

                <PopupTask model={this.state.popupModel} changeStatusTask={this.changeStatusTask}/>
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
