var React = require('react');

var Task = React.createClass({
    render: function() {
        return (
            <div className="task">
                <div>{this.props.model.name}</div>
            </div>
        );
    }
});

module.exports = Task;
