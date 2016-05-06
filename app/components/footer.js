import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Container from './container'
import { isOnServer } from '../utils'
import { getArticles } from '../actions/article'

import styles from '../styles/footer.css'
import grid from '../styles/grid.css'

class Footer extends Component {
  static loadProps({ dispatch }) {
    return dispatch(getArticles())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
    this.state = {
      footerHeight: 0
    }
  }

  componentDidMount() {
    if (isOnServer()) {
      return
    }
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    if (isOnServer()) {
      return
    }
    window.removeEventListener('resize', this.handleResize)
  }

  componentWillReceiveProps(nextProps) {
    if (isOnServer()) {
      return
    }
    setTimeout(this.handleResize, 0)
  }

  handleResize() {
    const footer = findDOMNode(this.refs.footer)
    this.setState({
      footerHeight: footer
        ? footer.offsetHeight
        : 200
    })
  }

  render() {
    const { active, $, ja, articles, query } = this.props
    return (
      <footer>
        <div className={styles.shadow} style={{height: this.state.footerHeight}}></div>
        <div ref="footer" className={styles.footer}>
          <Container noGutter={true}>
            <div className={styles.column}>
              <h3>{$('Sitemap')}</h3>
              <ul>
                <li><Link to={`/${query}`}>{$('TOP')}</Link></li>
                {
                  articles.map(a => (
                    <li key={a._id}><Link to={`/-/${a.slug}${query}`}>{ja ? a.title_ja : a.title_en}</Link></li>
                  ))
                }
              </ul>
              <ul>
                { !active ? <li><Link to="/login">{$('Login')}</Link></li>: null }
                { active ? <li><Link to="/manage">{$('Manage')}</Link></li>: null }
                { active ? <li><Link to="/logout">{$('Logout')}</Link></li>: null }
              </ul>
            </div>
            <div className={styles.column}>
              <h3>{$('Links')}</h3>
              <ul>
                <li><a href={$('https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-24390133/')}>{$('KAKEN database page')}</a></li>
                <li><a href={$('http://edu.med.hokudai.ac.jp/cmeen/')}>
                  {$('Center for Medical Education')} | {$('Hokkaido University Graduate School of Medicine')}
                </a></li>
              </ul>
              <h3>{$('Site Policy')}</h3>
              <p>
                <a href="http://www.hokudai.ac.jp/sub/policy/unyou.pdf">
                  {$('Operation policy for websites of Hokkaido University(PDF written in Japanese)')}
                </a>
              </p>
            </div>
            <div className={styles.column}>
              <h3>{$('Contacts')}</h3>
              <dl>
                <dt>{$('Leader')}</dt>
                <dd>{$('Junji Otaki')}（{$('Professor of Hokkaido University')}）</dd>
                <dt>{$('Address')}</dt>
                <dd>{$('Kita 14, Nishi 5, Kita-ku, Sapporo, 060-8648 Hokkaido, JAPAN')}</dd>
                <dt>TEL/FAX</dt>
                <dd>{$('+81-11-706-5136')}</dd>
              </dl>
            </div>
          </Container>
        </div>
      </footer>
    )
  }
}




export default connect((state, ownProps)=> {
  return {
    active: !!state.session.user,
    articles: state.article.items.filter(c => !c.category),
    ja: state.locale.ja,
    query: state.locale.query,
    $: state.locale.getText,
  }
})(Footer)
