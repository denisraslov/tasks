var React = require('react'),
    Menu = require('./Menu.jsx');

var Panel = React.createClass({
    render: function() {
        return (
            <div id="panel" className="panel">
                <Menu />
            </div>
        );
    }
});

module.exports = Panel;
