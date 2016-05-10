import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Header, { SubHeader } from '../components/header'
import Container from '../components/container'

import LoginForm from '../forms/login'
import { login } from '../actions/session'
import { showToast } from '../actions/toast'


class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    const { dispatch } = this.props
    dispatch(login(data)).then(()=> {
      this.context.router.push('/')
      dispatch(showToast('ログインしました'))
    })
  }
  render() {
    return (
      <div>
        <Header pathname={this.props.location.pathname}  />
        <SubHeader />
        <Container>
          <h1>Login</h1>
          <p>Back to <Link to="/">top page</Link>.</p>
          { this.props.active
              ? (
                <p>You are already logged in.
                  Please <Link to="/logout">Logout</Link>.</p>
              )
              : null
          }
          <LoginForm disabled={this.props.active} onSubmit={this.onSubmit.bind(this)}/>
        </Container>
      </div>
    )
  }
}


export default connect((state, ownProps) =>({
  active: !!state.session.user,
}))(Login)
