import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fs from 'fs'

import axios from 'axios'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import Helmet from 'react-helmet'

import { getStore, createRoutes, initialState } from 'routes'

import template from './templates/index.tmpl.html'

var app = express()
var history = createMemoryHistory()
var routes = createRoutes(history)

var renderFullPage = (html, initialState, helmetMeta, title) => template({
  html,
  initialState: JSON.stringify(initialState),
  helmetMeta,
  title
})

var createElementFn = serverProps => (Component, props) => (<Component {...serverProps} {...props} />)

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/static', express.static('static'))
global.navigator = { userAgent: 'all' }

app.get('*', (req, res) => {
  axios.defaults.baseURL = `${req.protocol}://${req.get('Host')}`

  match({routes, location: req.url}, (error, redirect, props) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search)
    } else if (props) {
      var store = getStore(initialState)

      var comp = props.components[props.components.length - 1].WrappedComponent;

      (comp && comp.initialData ? comp.initialData(props) : Promise.resolve()).then((initialData) => {
        var html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...props} createElement={createElementFn({initialData})} />
          </Provider> 
        )

        var head = Helmet.rewind()

        res.status(comp ? 200 : 404).send(renderFullPage(html, initialState, head.meta.toString(), head.title.toString()))
      });
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})