import React from 'react';
import { connect } from 'react-redux';
import store from './../../store.jsx';
import Panel from './../../components/Panel.jsx';
import Calendar from './../../components/Calendar.jsx';
import AdderTask from './../../components/AdderTask.jsx';
import ListTasks from './../../components/ListTasks.jsx';
import PopupTask from './../../components/PopupTask.jsx';

function getNotDatedTasks(tasks) {
    let completedTasks = [],
        activeTasks = [];

    tasks
        .filter((item) => !item.date)
        .forEach((item) => {
            item.completed ?
                completedTasks.push(item) :
                activeTasks.push(item);
        });

    return {completed: completedTasks, active: activeTasks};
}

class TasksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: store.getState().tasks
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({tasks: store.getState().tasks});
        })
    }

    showPopup(task) {
        this.setState({popupModel: task});
    }

    onPopupClose() {
        this.setState({popupModel: null});
    }

    addTask(name) {
        store.dispatch({type: 'ADD_TASK', data: {name: name}});
    }

    changeTaskStatus(id) {
        store.dispatch({type: 'CHANGE_TASK_STATUS', data: {id: id}});
    }

    changeTask(id, params) {
        store.dispatch({type: 'EDIT_TASK', data: {id: id, params: params }});
    }

    render() {
        const notDatedTasks = getNotDatedTasks(this.state.tasks);

        return (
            <div>
                <Panel />
                <div className='page__content page_tasks__content'>

                    <Calendar
                        tasks={this.state.tasks}
                        showPopup={this.showPopup.bind(this)}
                    />

                    <div className='page_tasks__tasksListWrap'>
                        <AdderTask onAdd={this.addTask}/>
                        <ListTasks
                            title="Let's do it!"
                            placeholder="Nothing to do! Have a nice day!"
                            items={notDatedTasks.active}
                            showPopup={this.showPopup.bind(this)}
                            changeTaskStatus={this.changeTaskStatus.bind(this)}
                        />
                        <ListTasks
                            title="Good job"
                            placeholder="Nothing was done yet..."
                            items={notDatedTasks.completed}
                            showPopup={this.showPopup.bind(this)}
                            changeTaskStatus={this.changeTaskStatus.bind(this)}
                        />
                    </div>
                    {this.state.popupModel != null ?
                        <PopupTask
                            model={this.state.popupModel}
                            open={!!this.state.popupModel}
                            onRequestClose={this.onPopupClose.bind(this)}
                            changeTaskStatus={this.changeTaskStatus.bind(this)}
                            changeTask={this.changeTask.bind(this)}
                        /> : ''
                    }
                </div>
            </div>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TasksPage);
