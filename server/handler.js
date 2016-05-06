import express from 'express'

import React, {createElement as $} from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { rewind } from 'react-helmet'
import { Provider } from 'react-redux'

import routes from '../app/routes'
import configureStore from '../app/store/configure'
import { setToken, unsetToken } from '../app/actions/token'
import { configureHttp } from '../app/lib/http'

const webpackIsomorphicTools = global.webpackIsomorphicTools


function buildHtml(head, script, content, initialState) {
  return `<!doctype html>
<html>
  <head>
    ${head}
  </head>
  <body>
    <div id="app">${content}</div>
    <script>
      window.__initial_state__ = ${JSON.stringify(initialState)}
    </script>
    ${script}
  </body>
</html>`
}

export default function(req, res, onError) {
  match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      res.status(404).send('Not found')
    } else {
      const store = configureStore({})

      const render = ()=> {
        const provider = $(Provider, {store: store}, $(RouterContext, renderProps))
        // NOTE: Do not show token in prerendered html
        store.dispatch(unsetToken())
        const initialState = store.getState()

        const content = renderToString(provider)
        const head = rewind()
        const assets = webpackIsomorphicTools.assets()

        const heads = []
        heads.push(head.title.toString())
        heads.push(head.meta.toString())
        heads.push(head.link.toString())

        for (let name in assets.styles) {
          let path = assets.styles[name]
          heads.push(` <link rel="stylesheet" href="${path}"/>`)
        }

        const scripts = []
        for (let name in assets.javascript) {
          let path = assets.javascript[name]
          scripts.push(`<script src="${path}"></script>`)
        }

        const html = buildHtml(heads.join('\n'), scripts.join('\n'), content, initialState)
        const notFound = false
        res.status(notFound ? 404 : 200).send(html)
      }

      configureHttp(store.getState)
      if (req.cookies.token) {
        store.dispatch(setToken(req.cookies.token))
      }
      const params = {
        dispatch: store.dispatch,
        params: renderProps.params,
      }
      const promises = renderProps.components.map(c => {
        const hasLoadProps = c && c.loadProps && typeof c.loadProps === 'function'
        return hasLoadProps
          ? c.loadProps(params)
          : Promise.resolve()
      })
      Promise.all(promises).then(render, onError)
    }
  })
}
