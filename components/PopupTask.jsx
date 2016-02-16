var React = require('react');
var Modal = require('react-modal');

const popupStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

var PopupTask = React.createClass({
    getInitialState: function () {
        return {
            modalIsOpen: false,
            model: {
                name: '',
                completed: false
            }
        }
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({model: nextProp.model, modalIsOpen: true});
    },
    closeModal: function () {
        this.setState({modalIsOpen: false})
    },
    changeStatus: function () {
        var model = this.state.model;

        if (this.state.model.completed) {
            this.props.changeStatusTask(false, model.id);
            model.completed = false;
        } else {
            this.props.changeStatusTask(true, model.id);
            model.completed = true;
        }

        this.setState({model: model});
    },
    render: function () {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={popupStyles}>

                    <div>{this.state.model.name}</div>
                    <input type='checkbox' checked={this.state.model.completed} onChange={this.changeStatus}/>
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        );
    }
});

module.exports = PopupTask;