import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import cx from 'classnames'
import dateFormat from 'dateformat'
import MarkdownComponent from 'react-markdown'

import Header, { SubHeader } from '../components/header'
import Container from '../components/container'
import Footer from '../components/footer'
import Modal from '../components/modal'
import NotFound from '../components/not_found'
import Sidebar from '../components/sidebar'

import { getArticles } from '../actions/article'
import { getCategories } from '../actions/category'
import { findItemBySlug, getMarkdownRenderers } from '../utils'

import styles from '../styles/article.css'


class Article extends Component {
  static loadProps({ dispatch, params }) {
    return dispatch(getArticles())
    .then(dispatch(getCategories()))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  render() {
    const { article, ja, query } = this.props
    const title = ja ? article.title_ja : article.title_en
    const content = ja ? article.content_ja : article.content_en
    return (
      <div>
        <Helmet title={title} />
        <Header pathname={this.props.location.pathname} />
        <SubHeader />
        <Container>
          { (article.category !== null) ? <Sidebar className={styles.sidebar} /> : null}
          <div className={cx(styles.content, {
              [styles.contentWithSidebar]: !!article.category
            })}>
            <h1>{title}</h1>
            <MarkdownComponent
              source={content || ''}
              renderers={getMarkdownRenderers({
                transformHref: href => href + query
              })}/>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  ja: state.locale.ja,
  query: state.locale.query,
  category: ownProps.params.categorySlug === '-'
    ? null
    : findItemBySlug(state.category.items, ownProps.params.categorySlug, {}),
  article: findItemBySlug(state.article.items, ownProps.params.slug, {}),
}))(Article)
