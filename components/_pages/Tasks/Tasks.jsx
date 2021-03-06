import React, {Component} from 'react'
import { connect } from 'react-redux'
import Panel from './../../Panel/Panel.jsx'
import Calendar from './../../Calendar/Calendar.jsx'
import AdderTask from './../../AdderTask/AdderTask.jsx'
import ListTasks from './../../ListTasks/ListTasks.jsx'
import PopupTask from './../../PopupTask/PopupTask.jsx'
import * as actions from './../../../actions'
import { push } from 'react-router-redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import InitDataWrapper from './../../_containers/InitData.jsx'
import PageWrapper from './../../_containers/Page.jsx'

import CSSModules from 'react-css-modules'
import styles from './Tasks.css'

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

    changeTask(id, params) {
        this.props.dispatch(actions.editTask(id, params));
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

                <div styleName="content">

                    <Calendar
                        tasks={this.props.data.tasks}
                        showPopup={this.showPopup.bind(this)}
                        changeTask={this.changeTask.bind(this)}
                    />

                    <div styleName="listWrap">
                        <AdderTask onAdd={this.addTask.bind(this)}/>
                        <ListTasks
                            id="activeListTasks"
                            title="Let's do it!"
                            placeholder="Nothing to do! Have a nice day!"
                            items={notDatedTasks.active}
                            showPopup={this.showPopup.bind(this)}
                            changeTask={this.changeTask.bind(this)}
                            />
                        <ListTasks
                            id="completedListTasks"
                            title="Good job"
                            placeholder="Nothing was done yet..."
                            items={notDatedTasks.completed}
                            showPopup={this.showPopup.bind(this)}
                            changeTask={this.changeTask.bind(this)}
                            />
                    </div>
                    {this.state.popupModel != null ?
                        <PopupTask
                            model={this.state.popupModel}
                            open={!!this.state.popupModel}
                            onRequestClose={this.onPopupClose.bind(this)}
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

export default PageWrapper(
    InitDataWrapper(
        connect(select)(
            DragDropContext(HTML5Backend)(
                CSSModules(TasksPage, styles)
            )
        )
    )
);
