import React from 'react'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './App.jsx'
import IndexPage from 'views/IndexPage/Index.jsx'

var initialState = {}
export {initialState}

export function getStore(state = initialState) {
  return createStore(
    combineReducers({
      routing: routerReducer
    }),
    state,
    applyMiddleware(thunk)
  )
}

export function callw(callback) { // if i want call browser objects outside componentDidMount
  if (typeof window !== 'undefined') {
    callback()
  }
}

export function createRoutes(history, store) {
  if (store) {
    history = syncHistoryWithStore(history, store)
  }

  var onUpdate = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route component={App}>
        <Route path='/' component={IndexPage} />
      </Route>
    </Router>
  )
}
