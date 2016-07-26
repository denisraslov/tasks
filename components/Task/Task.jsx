import React, {Component} from 'react'
import Checkbox from 'material-ui/lib/checkbox'
import {DragSource} from 'react-dnd'

import CSSModules from 'react-css-modules'
import styles from './Task.css'

const taskFromList = {
    beginDrag(props){
        return {id: props.model._id};
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
                 styleName="task"
                 onClick={this.showPopup.bind(this)}
                 style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                 }}>
                <Checkbox
                    checked={model.completed}
                    onCheck={this.changeTask.bind(this)}
                    onClick={(e)=> {e.stopPropagation()}}
                    style={{
                        verticalAlign: 'middle',
                        display: 'inline-block',
                        width: '36px'
                    }}
                />
                <div styleName="title">{model.title}</div>
            </div>
        );
    }

    showPopup(e) {
        this.props.showPopup(this.state.model);
    }
}

export default DragSource('task', taskFromList, collect)(CSSModules(Task, styles));
