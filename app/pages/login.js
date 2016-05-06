import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Container from '../components/container'

import LoginForm from '../forms/login'
import { login } from '../actions/session'


class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    this.props.dispatch(login(data)).then(()=> {
      this.context.router.push('/')
    })
  }
  render() {
    return (
      <div>
        <Header />
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
