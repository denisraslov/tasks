import React, {Component} from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import {DragSource} from 'react-dnd';

const taskFromList = {
    beginDrag(props){
        return {id: props.model.id};
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    changeTask(e) {
        const model = this.state.model;

        model.completed = !model.completed;
        this.props.changeTask(model._id, {completed: model.completed});

        this.setState({model : model});
    }

    render() {
        const {model} = this.state;
        const {connectDragSource, isDragging, mo} = this.props;

        return connectDragSource(
            <div id={'task' + model._id}
                 className="task"
                 onClick={this.showPopup.bind(this)}
                 style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                 }}>
                <Checkbox
                    className="task__checkbox"
                    checked={model.completed}
                    onCheck={this.changeTask.bind(this)}
                    onClick={(e)=> {e.stopPropagation()}}
                    />
                {model.title}
            </div>
        );
    }

    showPopup(e) {
        this.props.showPopup(this.state.model);
    }
}

export default DragSource('task', taskFromList, collect)(Task);
