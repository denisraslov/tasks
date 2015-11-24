var React = require('react'),
    moment = require('moment'),
    Panel = require('./components/Panel.jsx');

    require('./styles.scss');

    moment.locale('ru');

var App = React.createClass({
    render: function() {
        return (
            <div className="page">
                <Panel />
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;