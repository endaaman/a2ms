import React, { Component } from 'react'
import Helmet from 'react-helmet'
import queryString from 'query-string'
import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'
import Loader from './loader'
import Toast from './toast'

import { check } from '../actions/session'
import { setLocale } from '../actions/locale'
import { getGoogleFontsHref } from '../utils'

import styles from '../styles/root.css'


class Root extends Component {
  static loadProps({ dispatch }) {
    return dispatch(check())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)

    this.setLocale(this.props.location)
  }
  componentWillReceiveProps(nextProps) {
    this.setLocale(nextProps.location)
  }

  setLocale(location) {
    const query = queryString.parse(location.search)
    const code = 'en' in query
      ? 'en'
      : 'ja'
    this.props.dispatch(setLocale(code))
  }

  render() {
    const desc = '現代の日本における医学部入試の妥当性を多角的に検討し、今後のあるべき姿を探る'
    return (
      <div className={styles.root}>
        <Helmet
          titleTemplate="%s | 医学部入試の妥当性を考える"
          link={[
            {'rel': 'stylesheet', 'href': getGoogleFontsHref({
              'Ubuntu': true,
              'Ubuntu Mono': true,
              'Oswald': true,
              'Lato': true,
            })},
            {'rel': 'shortcut icon', 'href': require('../assets/favicon.ico')},
          ]}
          meta={[
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1' },
            { name: 'description', content: desc },
            { property: 'og:description', content: desc },
          ]}
        />
        {this.props.children}
        <Loader />
        <Toast />
      </div>
    )
  }
}

export default connect(state => ({
  locale: state.locale.code
}))(Root)
