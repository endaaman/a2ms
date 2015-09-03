require 'font-awesome/css/font-awesome.css'

if /localhost/.test location.host
    require 'webpack-dev-server/client?http://localhost:8080'

window._Promise = window.Promise
window.Promise = require 'bluebird'

require 'page'
require 'eventemitter2'

require 'vue'
require 'vue-validator'
require 'vue-resource'
require 'marked'
require 'moment'
require 'zeroclipboard'
require 'spaseo.js'

(require 'zeroclipboard').config
    swfPath: require 'file!zeroclipboard/dist/ZeroClipboard.swf'

marked = require 'marked'
renderer = new marked.Renderer()
renderer.link = (href, title, text)->
    external = not /^\//.test href
    usePrefix = external and (not /^http/.test text) and (not /.+\..+/.test text)
    target = if external then ' target="_blank"' else ''
    prefix = if usePrefix then '<i class=\"fa fa-external-link\"></i>' else ''
    title = if title then " title=\"#{title}\"" else ''
    href= " href=\"#{href}\""
    "<a#{href}#{target}#{title}>#{prefix}#{text}</a>"
marked.setOptions
    renderer: renderer
