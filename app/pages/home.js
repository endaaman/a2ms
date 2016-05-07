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
import { getText, applyQuery } from '../lib/localization'
import { getMarkdownRenderers, isInnerLink } from '../utils'

import styles from '../styles/home.css'
import grid from '../styles/grid.css'

class CategoryPanels extends Component {
  render() {
    const { categories } = this.props
    return (
      <ul className={styles.categoryPanels}>
        {
          categories.map(c =>(
            <li key={c._id} className={styles.categoryPanel}>
              <Link to={`/${c.slug}`}>
                {/*<img src={c.image_url} />*/}
                <h3>{c.name_ja}</h3>
                <p>{c.desc_ja}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    )
  }
}

class NewsList extends Component {
  render() {
    const { newss, locale: {code, ja} } = this.props
    const qq = applyQuery[code]
    return (
      <div className={styles.newsList}>
        <ul>
          {
            newss.map(n =>{
              const message = (ja ? n.message_ja : n.message_en) || ''
              return (
                <li key={n._id}>
                  <div className={styles.newsDate}>{dateFormat(n.date, (ja ? 'yyyy.m.d' : 'mmmm d, yyyy'))}</div>
                  {
                    n.url
                      ? <Link to={isInnerLink(n.url) ? qq(n.url) : n.url}>{message}</Link>
                      : <span>{message}</span>
                  }
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
    return dispatch(getArticles())
    .then(dispatch(getCategories()))
    .then(dispatch(getNewss()))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  render() {
    const { categories, newss, locale, $ } = this.props
    return (
      <div>
        <Helmet
          title="Home"
        />
        <Header pathname={this.props.location.pathname} />
        <Hero />
        <Container>
          <h2 className={styles.heading}>{$('CATEGORIES')}</h2>
          <CategoryPanels categories={ categories }/>
        </Container>
        <Container>
          <h2 className={styles.heading}>{$('NEWS')}</h2>
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
  $: getText[state.locale.code],
  newss: state.news.items,
  categories: state.category.items,
}))(Home)
