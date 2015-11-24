var React = require('react'),
    moment = require('moment'),
    Panel = require('./components/Panel.jsx');

    require('./styles.scss');

    moment.locale('ru');

var App = React.createClass({
    render: function() {
        return (
            <div id="page" className="page">
                <Panel />
                {this.props.children}
            </div>
        );
    },
    componentDidMount: function() {
        this.setPageHeight();

        window.addEventListener('resize', this.setPageHeight);
    },
    setPageHeight: function(e) {
        document.getElementById('page').style.height = window.innerHeight + 'px';
    }
});

module.exports = App;