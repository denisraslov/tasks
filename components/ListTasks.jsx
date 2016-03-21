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

        return connectDropTarget(
            <div className="listTasks"
                 style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                 }}>
                <div className="listTasks__title">{this.props.title}</div>
                {this.renderItems()}
                {
                    isOver &&
                    <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow'
                        }}/>
                }
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
