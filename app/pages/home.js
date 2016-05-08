import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import MarkdownComponent from 'react-markdown'
import dateFormat from 'dateformat'

import Root from '../components/root'
import Header from '../components/header'
import Footer from '../components/footer'
import Hero from '../components/hero'
import Container from '../components/container'

import { getArticles } from '../actions/article'
import { getCategories } from '../actions/category'
import { getNewss } from '../actions/news'
import { getText, applyQuery, getField } from '../lib/localization'
import { getMarkdownRenderers, isInnerLink } from '../utils'

import styles from '../styles/home.css'
import grid from '../styles/grid.css'

class CategoryPanels extends Component {
  render() {
    const { categories, articles, locale } = this.props
    const qq = applyQuery(locale.code)
    const ff = getField(locale.code)
    return (
      <ul className={styles.categoryPanels}>
        {
          categories.map(c => {
            const indexArticle = articles.find(a => a.category === c._id && !a.draft)
            if (!indexArticle) {
              return null
            }
            const href = qq(`/${c.slug}/${indexArticle.slug}`)
            return (
              <li key={c._id} className={styles.categoryPanel}>
                <Link to={href}>
                  <h3>{ff(c, 'name')}</h3>
                  {
                    c.image_url
                      ? <div className={ff(c, 'desc') ? styles.img : styles.imgOnly} style={{backgroundImage: `url(${c.image_url})`}} />
                      : null
                  }
                  <p>{ff(c, 'desc')}</p>
                </Link>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

class NewsList extends Component {
  render() {
    const { newss, locale: {code, ja} } = this.props
    const qq = applyQuery(code)
    return (
      <div className={styles.newsList}>
        <ul>
          {
            newss.map(n =>{
              const message = (ja ? n.message_ja : n.message_en) || ''
              return (
                <li key={n._id}>
                  <div className={styles.newsDate}>{dateFormat(n.date, (ja ? 'yyyy m/d' : 'mmmm d, yyyy'))}</div>
                  <div className={styles.newsMessage}>
                    {
                      n.url
                        ? <Link to={isInnerLink(n.url) ? qq(n.url) : n.url}>{message}</Link>
                        : <span>{message}</span>
                    }
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}



class Home extends Component {
  static loadProps({ dispatch }) {
    return Promise.all([
      dispatch(getArticles()),
      dispatch(getCategories()),
      dispatch(getNewss()),
    ])
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  render() {
    const { categories, newss, articles, locale, $ } = this.props
    return (
      <div>
        <Helmet
          title="Home"
        />
        <Header pathname={this.props.location.pathname} />
        <Hero />
        <Container>
          <h2 className={styles.heading}>TABLE OF CONTENTS</h2>
          <CategoryPanels categories={categories} articles={articles} locale={locale} />
        </Container>
        <Container>
          <h2 className={styles.heading}>NEWS</h2>
          <NewsList newss={newss} locale={locale} />
        </Container>
        <Footer />
      </div>
    )
  }
}

export default connect(state => ({
  active: !!state.session.user,
  locale: state.locale,
  $: getText(state.locale.code),
  newss: state.news.items,
  articles: state.article.items,
  categories: state.category.items,
}))(Home)
