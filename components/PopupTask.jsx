import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({model: newProps.model});
    }

    changeTaskStatus() {
        this.props.changeTaskStatus(this.state.model.id);
    }

    changeTaskName(e) {
        this.props.changeTaskName(e.target.value, this.state.model.id);
    }

    changeTaskDescription(e) {
        this.props.changeTaskDescription(e.target.value, this.state.model.id);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.onRequestClose}
                />
        ]
        return (
            <Dialog
                title={
                    <TextField
                        hintText='Изменить'
                        floatingLabelText={this.state.model.name}
                        floatingLabelStyle={{color: 'black'}}
                        className='taskPopup__name'
                        underlineShow={false}
                        onEnterKeyDown={this.changeTaskName.bind(this)}
                        />
                }
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                >
                <TextField hintText='Изменить'
                           floatingLabelText={this.state.model.description}
                           floatingLabelStyle={{color: 'black'}}
                           underlineShow={false}
                           className='taskPopup__description'
                           onEnterKeyDown={this.changeTaskDescription.bind(this)}
                    />
                <Checkbox checked={this.state.model.completed}
                          onCheck={this.changeTaskStatus.bind(this)}
                          className='taskPopup__checkbox'
                    />
            </Dialog>
        );
    }
}