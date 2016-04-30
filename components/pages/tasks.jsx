import React, {Component} from 'react'
import { connect } from 'react-redux'
import Panel from './../../components/Panel.jsx'
import Calendar from './../../components/Calendar.jsx'
import AdderTask from './../../components/AdderTask.jsx'
import ListTasks from './../../components/ListTasks.jsx'
import PopupTask from './../../components/PopupTask.jsx'
import * as actions from './../../actions'
import { push } from 'react-router-redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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

class TasksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupModel: null
        };
    }

    showPopup(task) {
        this.setState({popupModel: task});
    }

    onPopupClose() {
        this.setState({popupModel: null});
    }

    addTask(name) {
        this.props.dispatch(actions.addTask(name));
    }

    changeTaskStatus(id) {
        this.props.dispatch(actions.changeTaskStatus(id));
    }

    changeTask(id, params) {
        this.props.dispatch(actions.editTask(id, params));
    }

    changeDateTask(id, time) {
        this.props.dispatch(actions.changeDateTask(id, time));
    }

    deleteDateTask(id) {
        this.props.dispatch(actions.deleteDateTask(id));
    }

    logout() {
        this.props.dispatch(actions.logout());
        this.props.dispatch(push('/login'));
    }

    render() {
        const notDatedTasks = getNotDatedTasks(this.props.data.tasks);

        return (
            <div>
                <Panel onLogout={this.logout.bind(this)} />

                <div className='page__content page_tasks__content'>

                    <Calendar
                        tasks={this.props.data.tasks}
                        showPopup={this.showPopup.bind(this)}
                        changeTask={this.changeTask.bind(this)}
                        />

                    <div className='page_tasks__tasksListWrap'>
                        <AdderTask onAdd={this.addTask.bind(this)}/>
                        <ListTasks
                            id="activeListTasks"
                            title="Let's do it!"
                            placeholder="Nothing to do! Have a nice day!"
                            items={notDatedTasks.active}
                            showPopup={this.showPopup.bind(this)}
                            changeTaskStatus={this.changeTaskStatus.bind(this)}
                            changeTask={this.changeTask.bind(this)}
                            deleteDateTask={this.deleteDateTask.bind(this)}
                            />
                        <ListTasks
                            id="completedListTasks"
                            title="Good job"
                            placeholder="Nothing was done yet..."
                            items={notDatedTasks.completed}
                            showPopup={this.showPopup.bind(this)}
                            changeTaskStatus={this.changeTaskStatus.bind(this)}
                            changeTask={this.changeTask.bind(this)}
                            deleteDateTask={this.deleteDateTask.bind(this)}
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
        data: state.app
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(DragDropContext(HTML5Backend)(TasksPage));
