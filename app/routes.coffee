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
    views:
        content: require './view/login'
,
    url: '/logout'
    views:
        content: require './view/logout'
,
    url: '/article'
    subs: [
        url: '/'
        views:
            content: require './view/article/list'
    ,
        url: '/:title/edit'
        views:
            content: require './view/article/edit'
    ,
        url: '/new'
        views:
            content: require './view/article/edit'
    ]
,
    url: '*'
    views:
        content: require './view/404'
]


module.exports = [
    views:
        root: require './view/root'
    subs: main
]
