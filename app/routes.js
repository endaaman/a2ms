import React from 'react'
import {  Route, IndexRoute, Redirect } from 'react-router'

import Root from './components/root'
import ManageRoot from './components/manage/root'

import Home from './pages/home'
import Article from './pages/article'
import Category from './pages/category'

import Login from './pages/login'
import Logout from './pages/logout'
import Signup from './pages/signup'
import NoMatch from './pages/no_match'

import ManageHome from './pages/manage/home'
import ManageArticleList from './pages/manage/article/list'
import ManageArticleNew from './pages/manage/article/new'
import ManageArticleEdit from './pages/manage/article/edit'
import ManageCategoryList from './pages/manage/category/list'
import ManageCategoryNew from './pages/manage/category/new'
import ManageCategoryEdit from './pages/manage/category/edit'
import ManageUser from './pages/manage/user'
import ManageFile from './pages/manage/file'
import ManageNewsList from './pages/manage/news/list'
import ManageNewsNew from './pages/manage/news/new'
import ManageNewsEdit from './pages/manage/news/edit'


const manage = (
  <Route path='manage' component={ ManageRoot }>
    <IndexRoute component={ ManageHome } />
    <Route path='article'>
      <IndexRoute component={ ManageArticleList } />
      <Route path='new' component={ ManageArticleNew } />
      <Route path=':id' component={ ManageArticleEdit } />
    </Route>
    <Route path='category'>
      <IndexRoute component={ ManageCategoryList } />
      <Route path='new' component={ ManageCategoryNew } />
      <Route path=':id' component={ ManageCategoryEdit } />
    </Route>
    <Route path='news'>
      <IndexRoute component={ ManageNewsList } />
      <Route path='new' component={ ManageNewsNew } />
      <Route path=':id' component={ ManageNewsEdit } />
    </Route>
    <Route path='user' component={ ManageUser } />
    <Route path='file' component={ ManageFile } />
  </Route>
)

export default (
  <Route path='/' component={ Root } >
    {manage}
    <Route path='login' component={ Login } />
    <Route path='logout' component={ Logout } />
    <Route path='signup' component={ Signup } />
    <IndexRoute component={ Home } />
    <Route path="/:slug" component={ Category } />
    <Route path="/:categorySlug/:slug" component={ Article } />
    <Route path='*' component={ NoMatch } />
  </Route>
)
