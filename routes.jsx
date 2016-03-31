import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router';
import App from './app.jsx';
import PageSignup from './components/pages/signup.jsx';
import PageLogin from './components/pages/login.jsx';
import PageTasks from './components/pages/tasks.jsx';

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router history={browserHistory}>
            {this.renderRoutes()}
        </Router>;
    }

    renderRoutes() {
        if (this.props.user) {
            return <Route path="/" component={App}>
                <IndexRoute component={PageTasks}/>
                <Route path="tasks" component={PageTasks}/>
                <Redirect from="*" to="/" />
            </Route>;
        } else {
            return <Route path="/" component={App}>
                <IndexRoute component={PageLogin}/>
                <Route path="login" component={PageLogin}/>
                <Route path="signup" component={PageSignup}/>
                <Redirect from="*" to="/" />
            </Route>;
        }
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        user: state.user
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Routes);
