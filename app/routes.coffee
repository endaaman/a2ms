u = require './lib/util'

main = [
    url: '/'
    data:
        meta:
            title: 'HOME'
            keywords: ['大学', '医学部', '入試']
    views:
        content: require './view/home'
,
    url: '/login'
    data:
        hero: false
        menu: false
    views:
        content: require './view/login'
,
    url: '/logout'
    data:
        hero: false
        menu: false
    views:
        content: require './view/logout'
,
    url: '/signup'
    data:
        hero: false
        menu: false
    views:
        content: require './view/signup'
,
    url: '/manage'
    data:
        hero: false
        next: '/'
        meta:
            title: '管理'
    views:
        content: require './view/manage'
    subs: [
        url: '/'
        views:
            manage_main: require './view/manage/main'
    ,
        url: '/user'
        views:
            manage_main: require './view/manage/user'
    ,
        url: '/file'
        views:
            manage_main: require './view/manage/file'
    ,
        url: '/article'
        subs: [
            url: '/'
            views:
                manage_main: require './view/manage/article'
        ,
            url: '/new'
            views:
                manage_main: require './view/manage/article/edit'
        ,
            url: '/:id'
            views:
                manage_main: require './view/manage/article/edit'
        ]
    ,
        url: '/tag'
        subs: [
            url: '/'
            views:
                manage_main: require './view/manage/tag'
        ,
            url: '/new'
            views:
                manage_main: require './view/manage/tag/edit'
        ,
            url: '/:id'
            views:
                manage_main: require './view/manage/tag/edit'
        ]
    ,
        url: '/category'
        subs: [
            url: '/'
            views:
                manage_main: require './view/manage/category'
        ,
            url: '/new'
            views:
                manage_main: require './view/manage/category/edit'
        ,
            url: '/:id'
            views:
                manage_main: require './view/manage/category/edit'
        ]
    ]

,
    url: '/article'
    data:
        hero: 'narrow'
    views:
        content: require './view/article'
    subs:[
        url: '/'
        views:
            article_main: require './view/article/list'
    ,
        url: '/:slug'
        views:
            article_main: require './view/article/show'
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
