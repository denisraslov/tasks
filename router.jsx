var React = require('react'),
    ReactDOM = require('react-dom'),
    RouterModule = require('react-router'),
    IndexRoute = RouterModule.IndexRoute,
    Router = RouterModule.Router,
    Route = RouterModule.Route,
    App = require('./app.jsx'),
    PageSignup = require('./components/pages/signup.jsx'),
    PageLogin = require('./components/pages/login.jsx'),
    PageTasks = require('./components/pages/tasks.jsx');

import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.jsx';

var router = {
    renderRouter: function () {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    {this.renderRoutes()}
                </Router>
            </Provider>
        );
    },
    renderRoutes: function () {
        console.log(store.user);
        if (true) {
            return <Route path="/" component={App}>
                <IndexRoute component={PageTasks}/>
                <Route path="tasks" component={PageTasks}/>
                <Route path="*" component={PageTasks}/>
            </Route>;
        } else {
            return <Route path="/" component={App}>
                <IndexRoute component={PageLogin}/>
                <Route path="login" component={PageLogin}/>
                <Route path="signup" component={PageSignup}/>
                <Route path="*" component={PageLogin}/>
            </Route>;
        }
    },
    run: function () {
        ReactDOM.render(this.renderRouter(), document.getElementById('content'));
    }
};

module.exports = router;
