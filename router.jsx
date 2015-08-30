var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./app.jsx'),
    PageTasks = require('./components/pages/tasks.jsx'),
    PageNotes = require('./components/pages/notes.jsx');

var router = {
    getRoutes: function() {
        return (
            <Route handler={App} path="/">
                <Route name="tasks" handler={PageTasks} />
                <Route name="notes" handler={PageNotes} />
            </Route>
        );
    },
    run: function() {
        Router.run(this.getRoutes(), Router.HistoryLocation, function(Handler) {
            React.render(<Handler/>, document.body);
        });
    }
};

module.exports = router;