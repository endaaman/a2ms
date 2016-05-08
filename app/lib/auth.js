import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import { check } from '../actions/session'

export function requireAuth(Target, Replacer, level = 'user') {
  class AuthComponent extends Component {
    static loadProps({ dispatch }) {
      return dispatch(check())
    }
    componentWillMount() {
      this.constructor.loadProps(this.props)
    }
    componentWillReceiveProps (nextProps) {
      this.constructor.loadProps(this.props)
    }

    render () {
      const { user, token } = this.props
      return level === 'admin'
        ? user && user.admin
        : user
          ? <Target {...this.props }/>
          : token
            ? null
            : <Replacer {...this.props }/>
    }
  }

  return connect((state) => ({
    user: state.session.user,
    token: state.token,
  }))(AuthComponent);

}
