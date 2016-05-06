import React, { Component } from 'react'

export class HardWrap extends Component {
  render() {
    const html = this.props.text.replace(/\n/g, '<br />')
    return (
      <span dangerouslySetInnerHTML={{__html: html}} />
    )
  }
}
