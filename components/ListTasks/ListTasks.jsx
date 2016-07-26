import React, {Component} from 'react'
import Task from './../Task/Task.jsx'
import {DropTarget} from 'react-dnd'

import CSSModules from 'react-css-modules'
import styles from './ListTasks.css'

const listTarget = {
    drop(props, monitor){
        const id = monitor.getItem().id;
        //props.deleteDateTask(id);
        if (props.id == 'completedListTasks') {
            props.changeTask(id, {completed: true, date: null});
        } else {
            props.changeTask(id, {completed: false, date: null});
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
        var styleName = (isOver ? 'listTasksDndOver' : 'listTasks');

        return connectDropTarget(
            <div styleName={styleName}>
                <div styleName="title">{this.props.title}</div>
                <div styleName="body">{this.renderItems()}</div>
            </div>
        );
    }

    renderItems() {
        const {items} = this.props;

        if (items.length) {
            return items.map((task)=> {
                return <Task key={task._id}
                             model={task}
                             showPopup={this.props.showPopup}
                             changeTask={this.props.changeTask}
                    />
            });
        } else {
            return <div styleName="placeholder">{this.props.placeholder}</div>
        }
    }
}

export default DropTarget('task', listTarget, collect)(CSSModules(ListTasks, styles));
