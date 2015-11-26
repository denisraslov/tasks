var React = require('react'),
    RightMenu = require('./RightMenu.jsx');

var Panel = React.createClass({
    render: function() {
        return (
            <div id="panel" className="panel">
                <RightMenu className="unvisible"/>
            </div>
        );
    }
});

module.exports = Panel;
