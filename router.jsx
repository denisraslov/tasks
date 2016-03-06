var React = require('react'),
    ReactDOM = require('react-dom'),
    RouterModule = require('react-router'),
    IndexRoute = RouterModule.IndexRoute,
    Router = RouterModule.Router,
    Route = RouterModule.Route,
    App = require('./app.jsx'),
    PageLogin = require('./components/pages/login.jsx'),
    PageTasks = require('./components/pages/tasks.jsx');

import { browserHistory } from 'react-router';

var router = {
    getRouter: function() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={PageTasks}/>
                    <Route path="tasks" component={PageTasks}/>
                    <Route path="login" component={PageLogin}/>
                    <Route path="*" component={PageTasks}/>
                </Route>
            </Router>
        );
    },
    run: function() {
        ReactDOM.render(this.getRouter(), document.getElementById('content'));
    }
};

module.exports = router;
