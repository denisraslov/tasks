var React = require('react');

var Task = React.createClass({
    render: function () {
        return (
            <div id={'task' + this.props.model.id} className="task" onClick={this.props.showPopupTask}>
                {this.props.model.name}
            </div>
        );
    }
});

module.exports = Task;
