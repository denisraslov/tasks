import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field.js';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import IconDone from 'material-ui/lib/svg-icons/action/done';

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

    changeTask() {
       const model = this.state.model

       model.completed = !model.completed
       this.props.changeTask(model._id, {completed: model.completed})

       this.setState({model: model})
    }

    editTitle(e) {
        this.setState({openEditTitle: true}, () => {
            ReactDOM.findDOMNode(this.refs.titleInput).getElementsByTagName('input')[0].focus();
        });
    }

    editDescription(e) {
        this.setState({openEditDescription: true }, () => {
            ReactDOM.findDOMNode(this.refs.descriptionInput).getElementsByTagName('textarea')[1].focus();
        });
    }

    saveTitle(e) {
        var value = e.target.value;

        this.props.changeTask(this.state.model._id, { title: value });
        //TODO: add Promise
        this.setState({openEditTitle: false});
    }

    saveDescription() {
        const value = ReactDOM.findDOMNode(this.refs.descriptionInput).getElementsByTagName('textarea')[1].value,
              model = this.state.model

        this.props.changeTask(model._id, { description: value });
        model.description = value;
        //TODO: add Promise
        this.setState({openEditDescription: false, model: model});
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
                            onEnterKeyDown={this.saveTitle.bind(this)}
                            defaultValue={this.state.model.title}
                            onBlur={this.saveTitle.bind(this)}

                        /> :
                        <div
                            className='taskPopup__title'
                            onClick={this.editTitle.bind(this)}>
                            {this.state.model.title}
                        </div>
                }

                {this.renderDescription()}

                <Checkbox
                    label="Complete"
                    checked={this.state.model.completed}
                    onCheck={this.changeTask.bind(this)}
                    className='taskPopup__checkbox'
                />
            </Dialog>
        );
    }

    renderDescription() {
        if (this.state.openEditDescription) {

            return <div style={{position:'relative'}}>
                <FloatingActionButton
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '0',
                        'zIndex': 100
                    }}
                    mini = {true}
                    secondary = {true}
                    onClick={this.saveDescription.bind(this)}
                    className="popupTask__descriptionSaveButton"
                    >
                    <IconDone />
                </FloatingActionButton>
                <TextField
                    id='description'
                    ref="descriptionInput"
                    className='taskPopup__descriptionInput'
                    multiLine={true}
                    defaultValue={this.state.model.description}
                />
            </div>;

        } else {
            return <div
                className='taskPopup__description'
                onClick={this.editDescription.bind(this)}>
                {this.state.model.description
                  ? this.state.model.description
                  : 'Default description'}
            </div>;
        }
    }
}
