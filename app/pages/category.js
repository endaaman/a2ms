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

import { getCategories } from '../actions/category'
import { applyQuery } from '../lib/localization'
import { findItemBySlug, getMarkdownRenderers } from '../utils'

import styles from '../styles/article.css'


class Article extends Component {
  static loadProps({ dispatch, params }) {
    return dispatch(getCategories())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  render() {
    const { ja, qq, categories, category } = this.props
    const name = ja ? category.name_ja : category.name_en
    return (
      <div>
        <Helmet title={name} />
        <Header pathname={this.props.location.pathname} />
        <SubHeader />
        <Container>
          <Sidebar className={styles.sidebar} />
          <div className={cx(styles.content, styles.contentWithSidebar)}>
            <h1>{name}</h1>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  ja: state.locale.ja,
  qq: applyQuery[state.locale.code],
  categories: state.category.items,
  category: findItemBySlug(state.category.items, ownProps.params.slug, {}),
}))(Article)
