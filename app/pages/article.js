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
import Sidebar from '../components/sidebar'
import NotFound from '../components/not_found'

import { getArticles } from '../actions/article'
import { getCategories } from '../actions/category'
import { applyQuery, getField } from '../lib/localization'
import { findItemBySlug, getMarkdownRenderers, isInnerLink } from '../utils'

import styles from '../styles/article.css'

class ArticleView extends Component {
  render() {
    const { article, locale: { ja, code }, category } = this.props
    const qq = applyQuery(code)
    const ff = getField(code)
    const noTranslation = ja
      ? !article.content_ja
      : !article.content_en
    const content = ja
      ? noTranslation
        ? article.content_en
        : article.content_ja
      : noTranslation
        ? article.content_ja
        : article.content_en
    return (
      <div className={cx(styles.content, {
          [styles.contentWithSidebar]: !!article.category
        })}>
        <div className={styles.header}>
          <h1>{ff(article, 'title')}</h1>
          <div className={styles.info}>
            <span>{dateFormat(article.created_at, ja ? 'yyyy m/d' : 'mmmm d, yyyy')}</span>
            {
              category._id
                ? <span> {ff(category, 'name')}</span>
                : null
            }
          </div>
        </div>
        <MarkdownComponent
          source={content || ''}
          renderers={getMarkdownRenderers({transformHref: qq})}/>
      </div>
    )
  }
}


class Article extends Component {
  static loadProps({ dispatch, params }) {
    return Promise.all([
      dispatch(getArticles()),
      dispatch(getCategories()),
    ])
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.constructor.loadProps(nextProps)
  }

  render() {
    const { article, locale, category, not_found } = this.props
    const title =
      article._id
        ? locale.ja
          ? article.title_ja
          : article.title_en
        : category
          ? locale.ja
            ? category.name_ja
            : category.name_en
          : ''
    const activeCategoryId =
      article._id
        ? article.category
        : category._id
    const activeArticleId = article._id || null

    return (
      <div>
        <Helmet title={title} />
        <Header pathname={this.props.location.pathname} />
        <SubHeader />
        <Container>
          { (article.category)
            ? <div className={styles.sidebar}>
                <Sidebar activeCategoryId={activeCategoryId} activeArticleId={activeArticleId} />
              </div>
            : null
          }
          { article._id
            ? <ArticleView article={article} category={category} locale={locale} />
            : not_found
              ? <NotFound />
              : null
          }
        </Container>
        <Footer />
      </div>
    )
  }
}

export default connect((state, ownProps) => {
  const article = findItemBySlug(state.article.items, ownProps.params.slug, {})
  return {
    locale: state.locale,
    qq: applyQuery[state.locale.code],
    category: ownProps.params.categorySlug === '-'
      ? {}
      : findItemBySlug(state.category.items, ownProps.params.categorySlug, {}),
    article: article,
    not_found: state.article.items.length > 0 && !article._id
  }
})(Article)
