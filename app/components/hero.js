import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { findDOMNode } from 'react-dom'

import Container from '../components/container'
import { HardWrap } from '../components/utils'

import { isOnServer } from '../utils'
import styles from '../styles/hero.css'




class Hero extends Component {
  render() {
    const { $ } = this.props
    return (
      <div className={styles.hero}>
        <Container>
          <h2 className={styles.title}>
            <HardWrap text={$('$hero_title')} />
          </h2>
          <p className={styles.message}>{$('$hero_message')}</p>
        </Container>
      </div>
    )
  }
}


export default connect(state => ({
  $: state.locale.getText
}))(Hero)
