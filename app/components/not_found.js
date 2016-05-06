import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

class NoMatch extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Back to top</Link>
      </div>
    )
  }
}

export default NoMatch
