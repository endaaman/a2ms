import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { getArticles } from '../actions/article'
import { getCategories } from '../actions/category'

import styles from '../styles/home.css'


class Sidebar extends Component {
  static loadProps({ dispatch }) {
    return dispatch(getArticles())
    .then(dispatch(getCategories()))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }


  getRelatedArticles(category, articles) {
    if (!category._id) {
      return []
    }
    const aa = articles.filter(a => a.category === category._id)
    return aa
  }


  render() {
    const { categories, articles, ja, query, className } = this.props
    return (
      <div className={className}>
        <ul>
          {
            categories.map(c =>{
              const relatedArticles = this.getRelatedArticles(c, articles)
              return relatedArticles.length < 1
                ? null
                : (
                  <li key={c._id}>
                    <h3><Link to={`/${c.slug}${query}`}>{ja ? c.name_ja : c.name_en}</Link></h3>
                    <ul>
                      {
                        relatedArticles.map(a => (
                          <li key={a._id}>
                            <Link to={`/${c.slug}/${a.slug}${query}`}>{ja ? a.title_ja : a.title_en}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  ja: state.locale.ja,
  query: state.locale.query,
  articles: state.article.items,
  categories: state.category.items,
}))(Sidebar)
