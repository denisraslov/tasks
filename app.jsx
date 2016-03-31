import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { getStore } from './store.jsx'

import App from './components/App.jsx'
import PageSignup from './components/pages/signup.jsx'
import PageLogin from './components/pages/login.jsx'
import PageTasks from './components/pages/tasks.jsx'

const baseHistory = createHistory();
const store = getStore(baseHistory);
const history = syncHistoryWithStore(baseHistory, store)

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.app.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={PageLogin}/>
        <Route path="signup" component={PageSignup}/>
        <Route path="tasks" component={UserIsAuthenticated(PageTasks)}/>
        <IndexRoute component={UserIsAuthenticated(PageTasks)}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
