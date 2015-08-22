u = require './lib/util'

main = [
    url: '/'
    data:
        meta:
            title: 'HOME'
            description: 'Admission to Medical School'
    views:
        content: require './view/home'
,
    url: '/login'
    data:
        hero: false
    views:
        content: require './view/login'
,
    url: '/logout'
    data:
        hero: false
    views:
        content: require './view/logout'
,
    url: '/article'
    subs: [
        url: '/'
        views:
            content: require './view/article/list'
    ,
        url: '/:title'
        views:
            content: require './view/article/show'
    ,
        url: '/:title/edit'
        views:
            content: require './view/article/edit'
    ,
        url: '/new'
        views:
            content: require './view/article/edit'
    ]
]


routes = [
    views:
        root: require './view/root'
    subs: u.copy main
,
    url: '*'
    views:
        root: require './view/404'
]


module.exports = routes
