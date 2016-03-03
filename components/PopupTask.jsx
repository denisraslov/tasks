import React from 'react';
import ReactDOM from 'react-dom';
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
        this.setState({openEditTitle: true}, () => {
            ReactDOM.findDOMNode(this.refs.titleInput).getElementsByTagName('input')[0].focus();
        });
    }

    editDescription(e) {
        this.setState({openEditDescription: true }, () => {
            ReactDOM.findDOMNode(this.refs.descriptionInput).focus();
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
        ];

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                {
                    this.state.openEditTitle ?
                        <TextField
                            id='title'
                            ref="titleInput"
                            className='taskPopup__titleInput'
                            onEnterKeyDown={this.editTitle.bind(this)}
                            readOnly={false}
                            value={this.state.model.name}
                            onBlur={this.lostFocusTitle.bind(this)}

                        /> :
                        <div
                            className='taskPopup__title'
                            onClick={this.editTitle.bind(this)}>
                            {this.state.model.name}
                        </div>
                }


                {this.state.openEditDescription ?
                    <textarea
                        id='description'
                        ref="descriptionInput"
                        className='taskPopup__descriptionInput'
                        onEnterKeyDown={this.editDescription.bind(this)}
                        value={this.state.model.description}
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