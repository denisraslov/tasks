import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model,
            openEditTitle: false,
            openEditDescription: false
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({model: newProps.model});
    }

    changeTaskStatus() {
        this.props.changeTaskStatus(this.state.model.id);
    }

    editTitle(e) {
        let value = e.target.value;

        this.setState({openEditTitle: !this.state.openEditTitle}, () => {
            this.state.openEditTitle ?
                document.getElementById('editTitle').focus() :
                this.props.changeTaskName(value, this.state.model.id);
        });
    }

    editDescription(e) {
        let value = e.target.value;

        this.setState({openEditDescription: !this.state.openEditDescription}, () => {
            this.state.openEditDescription ?
                document.getElementById('editDescription').focus() :
                this.props.changeTaskDescription(value, this.state.model.id);
        });
    }

    lostFocusTitle() {
        this.setState({openEditTitle: false});
    }

    lostFocusDescription() {
        this.setState({openEditDescription: false});
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
                    this.state.openEditTitle?
                        <TextField
                            id='editTitle'
                            className='taskPopup__title___enabled'
                            onEnterKeyDown={this.editTitle.bind(this)}
                            hintText={this.state.model.name}
                            onBlur={this.lostFocusTitle.bind(this)}
                            />:
                        <div
                            className='taskPopup__title___disabled'
                            onClick={this.editTitle.bind(this)}>
                            {this.state.model.name}
                        </div>
                }
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                >
                {
                    this.state.openEditDescription ?
                        <TextField
                            id='editDescription'
                            className='taskPopup__description'
                            onEnterKeyDown={this.editDescription.bind(this)}
                            hintText={this.state.model.description}
                            onBlur={this.lostFocusDescription.bind(this)}
                            /> :
                        <div
                            className='taskPopup__description'
                            onClick={this.editDescription.bind(this)}>
                            {this.state.model.description}
                        </div>
                }
                <Checkbox checked={this.state.model.completed}
                          onCheck={this.changeTaskStatus.bind(this)}
                          className='taskPopup__checkbox'
                    />
            </Dialog>
        );
    }
}