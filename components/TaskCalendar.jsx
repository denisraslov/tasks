import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    render() {
        const model = this.state.model;

        return (
            <div id={'task' + model.id} className="taskCalendar" onClick={this.showPopup.bind(this)}>
                {this.props.model.name}
            </div>
        );
    }

    showPopup(e) {
        this.props.showPopup(this.state.model);
    }
}
