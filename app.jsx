import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import InitAuthWrapper from './components/containers/InitAuth.jsx'
import { createNewStore } from './store'

import App from './components/App.jsx'
import PageSignup from './components/pages/signup.jsx'
import PageLogin from './components/pages/login.jsx'
import PageTasks from './components/pages/tasks.jsx'

const store = createNewStore(browserHistory)
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
      <Route path="" component={App}>
        <Route path="/login" component={InitAuthWrapper(UserIsNotAuthenticated(PageLogin))}/>
        <Route path="/signup" component={InitAuthWrapper(UserIsNotAuthenticated(PageSignup))}/>
        <Route path="/tasks" component={InitAuthWrapper(UserIsAuthenticated(PageTasks))}/>
        <Redirect from="/" to="tasks"/>
        <Redirect from="/*" to="tasks"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
