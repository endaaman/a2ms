import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { findDOMNode } from 'react-dom'

import Container from './container'
import { HardWrap } from './utils'

import { getText } from '../lib/localization'
import { isOnServer } from '../utils'
import styles from '../styles/hero.css'




class Hero extends Component {
  render() {
    const { $ } = this.props
    return (
      <div className={styles.hero}>
        <Container>
          <h2 className={styles.title}>
            <HardWrap text={$('$title')} />
          </h2>
          <p className={styles.message}>{$('$description')}</p>
        </Container>
      </div>
    )
  }
}


export default connect(state => ({
  $: getText(state.locale.code)
}))(Hero)
