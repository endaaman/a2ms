import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Container from '../components/container'
import SignupForm from '../forms/signup'
import { showToast } from '../actions/toast'
import Http from '../lib/http'
import { getApiRoot as api } from '../utils'


class Signup extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    const { dispatch } = this.props

    if (data.password !== data.reenteredPassword) {
      dispatch(showToast('パスワードが一致しません'))
      return
    }
    delete data.reenteredPassword

    Http().post(`${api()}/users`, data)
    .then(res => {
      dispatch(showToast('登録申請を行いました。管理人の承認をお待ちください', -1))
      this.context.router.push('/')
    }, () => {
      dispatch(showToast('入力情報にエラーが有りました'))
    })
  }
  render() {
    return (
      <div>
        <Container>
          <h1>ユーザー登録</h1>
          <p>Back to <Link to="/">top page</Link>.</p>
          { this.props.active
              ? (
                <p>You are already logged in.
                  Please <Link to="/logout">Logout</Link>.</p>
              )
              : null
          }
          <SignupForm disabled={this.props.active} onSubmit={this.onSubmit.bind(this)}/>
        </Container>
      </div>
    )
  }
}


export default connect((state, ownProps) =>({
  active: !!state.session.user,
  router: ownProps
}))(Signup)
