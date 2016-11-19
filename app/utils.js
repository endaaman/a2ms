import React from 'react'
import { Link } from 'react-router'


export function uuid(a) {
  return a
    ? (a ^ Math.random() * 16 >> a / 4).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
}

export function isProd() {
  return process.env.NODE_ENV === 'production'
}

export function isOnServer() {
  return !!(typeof process === 'object' && process + '' === '[object process]')
}


export function isPromise(p) {
  return !!p && (typeof p === 'object') && (p.then) && (typeof p.then === 'function')
}


export function keyBy(list, keyName) {
  const result = {}
  list.forEach(function(item) {
      result[item[keyName]] = item
  })
  return result
}


function asArray(v) {
  return Array.isArray(v) ? v : [v]
}


export function getGoogleFontsHref(fonts) {
  var family = Object.keys(fonts).map(function(name) {
    var details = fonts[name]
    name = name.replace(/\s+/g, '+')
    return typeof details === 'boolean'
      ? name
      : name + ':' + asArray(details).join(',')
  }).join('|')

  return '//fonts.googleapis.com/css?family=' + family
}


export function findItem(items, key, path, many = false) {
  const method = many
    ? Array.prototype.filter
    : Array.prototype.find
  return method.call(items, (item)=> item[key] === path)
}


export function findItemById(items, path, failResult = null) {
  const result = items.find((item)=> {
    let found = false
    if (path == '' + item.id) {
      found = true
    }
    return found
  })
  return result || failResult
}


export function findItemBySlug(items, path, failResult = null) {
  const result = items.find((item)=> {
    let found = false
    if (path === item.slug) {
      found = true
    }
    return found
  })
  return result || failResult
}


export function getArticlePath(articleSlug, categories, categoryId) {
  if (!articleSlug) {
    return ''
  }
  let base = '-'
  let c = null
  if (categoryId && (c = findItemById(categories, categoryId))) {
    base = c.slug
  }
  return `/${base}/${articleSlug}`
}


export function makeCategoryOptions(items, nullText) {
  const options = items.map(item => ({
    value: item.id,
    text: item.name_ja,
  }))
  if (nullText) {
    options.unshift({value: '', text: nullText})
  }
  return options
}


export function makeArticleOptions(items, nullText) {
  const options = items.map(item => ({
    value: item.id,
    text: item.title_ja,
  }))

  if (nullText) {
    options.unshift({value: '', text:　nullText})
  }

  return options
}


export function isInnerLink(uri) {
  const proxyedPaths = [
    /^\/api\/.*/,
    /^\/static\/.*/,
  ]

  if (proxyedPaths.find(reg => reg.test(uri))) {
    return false
  }

  if (/^\//.test(uri)) {
    return true
  }

  return false
}


export function getMarkdownRenderers(option = {}) {
  return {
    Link: props => {
      if (isInnerLink(props.href)) {
        const href = option.transformHref
          ? option.transformHref(props.href)
          : props.href
        return (<Link to={href}>{props.children}</Link>)
      } else {
        return (<a href={props.href} target="_black">{props.children}</a>)
      }
    },
    // NOTE: react-markdown makes a warning about key props of list items on React
    // Item: props => {
    //   return (
    //     <li {...props}>{props.children}</li>
    //   )
    // }
  }
}


export function formatByteSize(size, precision = 1) {
  if (isNaN(parseFloat(size)) || !isFinite(size)) {
    return '-'
  }
  const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
  const number = Math.floor(Math.floor(Math.log(size)) / Math.log(1024))
  return (size / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number]
}


export function getApiRoot() {
  return isOnServer()
    ? 'http://localhost:3000/api'
    : '/api'
}
