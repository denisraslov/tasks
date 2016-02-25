import React from 'react';
import Task from './Task.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='listTasks'>
                <div>{this.props.title}</div>
                {
                    this.props.items.map((task)=> {
                        return <Task key={task.id}
                                     model={task}
                                     showPopup={this.props.showPopup}
                                    changeTaskStatus={this.props.changeTaskStatus}
                            />
                    })
                }
            </div>
        );
    }
}
