var React = require('react');

var Task = React.createClass({
    render: function () {
        return (
            <div id={'task' + this.props.model.id} className="task" onClick={this.showPopup}>
                {this.props.model.name}
            </div>
        );
    },
    showPopup: function() {
        this.props.showPopup(this.props.model);
    }
});

module.exports = Task;
