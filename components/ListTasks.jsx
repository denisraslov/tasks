import React from 'react';
import Task from './Task.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var items = this.props.items;

        return (
            <div className="listTasks">
                <div className="listTasks__title">{this.props.title}</div>
                {this.renderItems()}
            </div>
        );
    }

    renderItems() {
        var items = this.props.items;

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
