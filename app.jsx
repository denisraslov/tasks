var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    moment = require('moment'),
    Panel = require('./components/Panel.jsx');

    require('./styles.scss');

    moment.locale('ru');

var App = React.createClass({

    mixins: [Router.Navigation, Router.State],

    getInitialState: function() {
        return {
            selectedIndex: null
        };
    },

    render: function() {
        return (
            <div className="page">
                <Panel />
                <RouteHandler/>
            </div>
        );
    },
    showMenu: function() {
        this.refs.nav.toggle();
    },
    _onLeftNavChange: function(e, index, item) {
        this.transitionTo(item.route);
    },
    _getSelectedIndex: function() {
        var currentItem;

        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.isActive(currentItem.route)) return i;
        }
    }
});

module.exports = App;