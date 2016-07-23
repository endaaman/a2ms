import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '../styles/loader.css'


class Loader extends Component {
  render() {
    return this.props.loader
      ? <div className={styles.loader}></div>
      : null
  }
}

export default connect(state => ({
  loader: state.loader
}))(Loader)
