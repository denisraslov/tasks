import React from 'react'
import TextField from 'material-ui/lib/text-field'

import CSSModules from 'react-css-modules'
import styles from './AdderTask.css'

class AdderTask extends React.Component {
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
            <div styleName="adderTask">
                <TextField
                    style={{
                        width: '100%'
                    }}
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

export default CSSModules(AdderTask, styles)
