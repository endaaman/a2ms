import React, { Component } from 'react'
import Modal from 'react-modal'

import styles from '../styles/modal.css'


class _Modal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        className={styles.content}
        overlayClassName={styles.overlay}>
        {this.props.children}
      </Modal>
    )
  }
}

export default _Modal
