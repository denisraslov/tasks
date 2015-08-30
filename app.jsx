var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    LeftNav = mui.LeftNav,
    MenuItem = mui.MenuItem,
    Toolbar = mui.Toolbar,
    DropDownMenu = mui.DropDownMenu,
    ToolbarGroup = mui.ToolbarGroup,
    injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

var menuItems = [
    { route: 'tasks', text: 'Задачи' },
    { route: 'notes', text: 'Заметки' }
];

var userMenItems = [
    { payload: '1', text: 'Администратор' },
    { payload: '2', text: 'Мой профиль' },
    { payload: '3', text: 'Выйти' }
];

var App = React.createClass({

    mixins: [Router.Navigation, Router.State],

    getInitialState: function() {
        return {
            selectedIndex: null
        };
    },

    render: function() {
        return (
            <div>
                <LeftNav ref="nav"
                    docked={false}
                    menuItems={menuItems}
                    selectedIndex={this._getSelectedIndex()}
                    onChange={this._onLeftNavChange} />

                <Toolbar>
                    <ToolbarGroup key={0} float="left">
                        <RaisedButton label="Меню" primary={true} onClick={this.showMenu} />
                    </ToolbarGroup>
                    <ToolbarGroup key={1} float="right">
                        <DropDownMenu menuItems={userMenItems} />
                    </ToolbarGroup>
                </Toolbar>

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