var React = require('react'),
    mui = require('material-ui');

var Deal = React.createClass({
    render: function() {
        return (
            <div className="content note">
                <div>{this.props.model.name}</div>
            </div>
        );
    }
});

module.exports = Deal;