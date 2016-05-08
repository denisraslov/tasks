import React, {Component} from 'react';
import {DragSource} from 'react-dnd';

const taskSource = {
    beginDrag(props){
        return {id: props.model.id};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class TaskCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    render() {
        const {model} = this.state;
        const {connectDragSource, isDragging} = this.props;

        return connectDragSource(
            <div id={'task' + model.id}
                 className="taskCalendar"
                 style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                 }}
                 onClick={this.showPopup.bind(this)}>
                {this.props.model.title}
            </div>
        );
    }

    showPopup(e) {
        this.props.showPopup(this.state.model);
    }
}

export default DragSource('task', taskSource, collect)(TaskCalendar);
