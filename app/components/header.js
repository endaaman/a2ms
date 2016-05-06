import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import cx from 'classnames'

import Container from '../components/container'
import styles from '../styles/header.css'

class Header extends Component {
  static propTypes = {
    pathname: React.PropTypes.string.isRequired
  }
  render() {
    const { ja, pathname } = this.props
    return (
      <header className={styles.header}>
        <Container>
          <Link to={ja ? '/' : '/?en'} className={styles.logo}>
            <img src={require('../assets/logo.svg')} />
            <h1>A2MS</h1>
            <div className={styles.logoText}>Admission to Medical School</div>
          </Link>
          <div className={cx(styles.rightItem, styles.languageSwitcher)}>
            <div className={ja ? styles.active : styles.inactive}>
              <Link to={pathname} className={styles.switchToJa}></Link>
            </div>
            <div className={ja ? styles.inactive : styles.active}>
              <Link to={`${pathname}?en`} className={styles.switchToEn}></Link>
            </div>
          </div>
          </Container>
      </header>
    )
  }
}

export class SubHeader extends Component {
  render() {
    return (
      <div className={styles.sub}></div>
    )
  }
}

export default connect((state) => ({
  ja: state.locale.code === 'ja',
}))(Header)
