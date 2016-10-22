import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import FastClick from 'react-fastclick-alt'

import 'styles/main'

import { getStore, createRoutes } from 'routes'

var store = getStore(window.__INITIAL_STATE__)
var state = store.getState()

ReactDOM.render(
  <Provider store={store}>
    <FastClick>
      {createRoutes(browserHistory, store)}
    </FastClick>
  </Provider>,

  document.getElementById('app')
)