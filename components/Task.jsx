import React from 'react';
import Checkbox from 'material-ui/lib/checkbox'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    changeTaskStatus(e) {
        this.props.changeTaskStatus(this.state.model.id);
    }

    render() {
        const model = this.state.model;

        return (
            <div id={'task' + model.id} className="task" onClick={this.showPopup.bind(this)}>
                <Checkbox
                    className="task__checkbox"
                    checked={model.completed}
                    onCheck={this.changeTaskStatus.bind(this)}
                    onClick={(e)=> {e.stopPropagation()}}
                />
                {this.props.model.name}
            </div>
        );
    }

    showPopup(e) {
        this.props.showPopup(this.state.model);
    }
}