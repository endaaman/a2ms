import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getArticles } from '../actions/article'
import { getCategories } from '../actions/category'
import { applyQuery, getField } from '../lib/localization'

import styles from '../styles/sidebar.css'


class Sidebar extends Component {
  static loadProps({ dispatch }) {
    return Promise.all([
      dispatch(getArticles()),
      dispatch(getCategories()),
    ])
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
    const { categories, articles, ja, qq, ff } = this.props
    const { activeCategoryId, activeArticleId } = this.props
    return (
      <div className={styles.sidebarContainer}>
        <ul className={styles.categoryList}>
          {
            categories.map(c =>{
              const relatedArticles = this.getRelatedArticles(c, articles)
              return relatedArticles.length < 1
                ? null
                : (
                  <li key={c._id}>
                    <h3>{ff(c, 'name')}</h3>
                    <ul className={styles.articleList}>
                      {
                        relatedArticles.map(a => (
                          <li key={a._id} className={activeArticleId === a._id ? styles.activeArticle : null}>
                            <Link to={qq(`/${c.slug}/${a.slug}`)}>{ff(a, 'title')}</Link>
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
  qq: applyQuery(state.locale.code),
  ff: getField(state.locale.code),
  articles: state.article.items,
  categories: state.category.items,
}))(Sidebar)
