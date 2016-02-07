var React = require('react'),
    ReactDOM = require('react-dom'),
    RouterModule = require('react-router'),
    IndexRoute = RouterModule.IndexRoute,
    Router = RouterModule.Router;
    Route = RouterModule.Route,
    History = require('history'),
    App = require('./app.jsx'),
    PageTasks = require('./components/pages/Tasks.jsx');

var router = {
    getRouter: function() {
        return (
            <Router history={this.createHistory()}>
                <Route path="/" component={App}>
                    <IndexRoute component={PageTasks}/>
                    <Route path="tasks" component={PageTasks}/>
                    <Route path="*" component={PageTasks}/>
                </Route>
            </Router>
        );
    },
    createHistory: function() {
        return History.createHistory({
            basename: '/tasks'
        });
    },
    run: function() {
        ReactDOM.render(this.getRouter(), document.getElementById('content'));
    }
};

module.exports = router;