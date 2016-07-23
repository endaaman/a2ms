import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import Header, { SubHeader } from '../components/header'
import Footer from '../components/footer'
import NotFound from '../components/not_found'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Header pathname={this.props.location.pathname} />
        <SubHeader />
        <NotFound />
        <Footer />
      </div>
    )
  }
}

export default NoMatch
