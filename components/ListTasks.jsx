import React, {Component} from 'react';
import Task from './Task.jsx';
import {DropTarget} from 'react-dnd';

const listTarget = {
    drop(props, monitor){
        const id = monitor.getItem().id;
        props.deleteDateTask(id);
        if (props.id == 'completedListTasks') {
            props.changeTask(id, {completed: true});
        } else {
            props.changeTask(id, {completed: false});
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class ListTasks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {items, connectDropTarget, isOver} = this.props;
        var className = 'listTasks' + (isOver ? ' listTasks_over' : '');

        return connectDropTarget(
            <div className={className}>
                <div className="listTasks__title">{this.props.title}</div>
                <div className="listTasks__body">{this.renderItems()}</div>
            </div>
        );
    }

    renderItems() {
        const {items} = this.props;

        if (items.length) {
            return items.map((task)=> {
                return <Task key={task.id}
                             model={task}
                             showPopup={this.props.showPopup}
                             changeTaskStatus={this.props.changeTaskStatus}
                    />
            });
        } else {
            return <div className="listTasks__placeholder">{this.props.placeholder}</div>
        }
    }
}

export default DropTarget('task', listTarget, collect)(ListTasks);
