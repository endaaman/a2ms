import React, { Component } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

import { connect } from 'react-redux'

import { hideToast } from '../actions/toast'
import styles from '../styles/toast.css'


class Toast extends Component {
  hide() {
    this.props.dispatch(hideToast())
  }

  render() {
    return (
      <CSSTransitionGroup transitionName={{
          enter: styles.enter,
          leave: styles.leave,
        }}
        transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        { this.props.active
          ? <div className={styles.toast} onClick={this.hide.bind(this)}>{this.props.message}</div>
          : null
        }
      </CSSTransitionGroup>
    )
  }
}

export default connect(state => ({
  active: state.toast.active,
  message: state.toast.message,
}))(Toast)
