import React from 'react';
import store from './../../store';
import Calendar from './../../components/Calendar.jsx';
import AdderTask from './../../components/AdderTask.jsx';
import ListTasks from './../../components/ListTasks.jsx';
import PopupTask from './../../components/PopupTask.jsx';

function filterTasks(tasks) {
    let completedTasks = [],
        activeTasks = [];

    tasks.forEach((item) => {
       item.completed ?
           completedTasks.push(item):
           activeTasks.push(item);
    });

    return {completedTasks: completedTasks, activeTasks: activeTasks};
}

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: store.getState().tasks
        };
    }
    componentDidMount(){
        store.subscribe(() => {
            this.setState({tasks: store.getState().tasks});
        })
    }
    showPopup(task){
        this.setState({popupModel: task});
    }
    onPopupClose(){
        this.setState({popupModel: null});
    }
    addTask(name){
        store.dispatch({type: 'ADD_TASK', data: {name: name}});
    }
    changeTaskStatus(id){
        store.dispatch({type: 'CHANGE_TASK_STATUS', data: {id: id}});
    }
    render(){
        const objTasks = filterTasks(this.state.tasks);

        return (
            <div className='page__content page_tasks__content'>

                <Calendar items={this.state.tasks} />

                <div className='page_tasks__tasksListWrap'>
                    <AdderTask onAdd={this.addTask} />
                    <ListTasks title='Active'
                               items={objTasks.activeTasks}
                               showPopup={this.showPopup.bind(this)}
                               changeTaskStatus={this.changeTaskStatus.bind(this)}
                               />
                    <ListTasks title='Completed'
                               items={objTasks.completedTasks}
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
                            /> : ''
                    }
            </div>
        );
    }
}

