import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'
import { Button } from '../components/controls'

import { logout } from '../actions/session'

class Logout extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  logout() {
    this.props.dispatch(logout())
    this.context.router.push('/')
  }
  render() {
    return (
      <div>
        <Container>
          <h1>Logout</h1>
          <p>Back to <Link to="/">top page</Link>.</p>
          { !this.props.active
              ? (
                <p>You are not logged in.
                Please <Link to="/login">Login</Link></p>
              )
              : null
          }
          <Button disabled={!this.props.active} onClick={this.logout.bind(this)}>Logout</Button>
        </Container>
      </div>
    )
  }
}

export default connect((state)=>({
  active: !!state.session.user
}))(Logout)
