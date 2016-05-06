import React, { Component } from 'react'
import cx from 'classnames'

import styles from '../styles/container.css'

class Root extends Component {
  render() {
    return (
      <div className={cx(styles.container, {[styles.noGutter]: this.props.noGutter})}>
        {this.props.children}
      </div>
    )
  }
}

export default Root
