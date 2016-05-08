import React from 'react';
import TextField from 'material-ui/lib/text-field';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    onKeyUp(e) {
        if (e.keyCode == 13) {
            let value = e.target.value;
            this.setState({value: ''});
            this.props.onAdd(value);
        }
    }

    render() {
        return (
            <div className="taskAdder">
                <TextField
                    className="taskAdder__input"
                    hintText="Type the task"
                    floatingLabelText="New task"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    />
            </div>
        )
    }
}
