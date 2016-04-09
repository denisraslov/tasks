import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import InitAuthWrapper from './components/InitAuth.jsx';
import { getStore } from './store.jsx'

import App from './components/App.jsx'
import PageSignup from './components/pages/signup.jsx'
import PageLogin from './components/pages/login.jsx'
import PageTasks from './components/pages/tasks.jsx'

const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store)

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.app.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/tasks',
  predicate: user => !user,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.app.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={InitAuthWrapper(UserIsNotAuthenticated(PageLogin))}/>
        <Route path="signup" component={InitAuthWrapper(UserIsNotAuthenticated(PageSignup))}/>
        <Route path="tasks" component={InitAuthWrapper(UserIsAuthenticated(PageTasks))}/>
        <Route path="*" component={InitAuthWrapper(UserIsAuthenticated(PageTasks))}/>
        <IndexRoute component={InitAuthWrapper(UserIsAuthenticated(PageTasks))}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
