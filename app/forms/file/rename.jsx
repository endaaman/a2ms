import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { formatByteSize } from '../../utils'
import { Button, Text } from '../../components/controls'



class FileRenameForm extends Component {
  componentWillMount() {
    this.props.initializeForm({ newName: this.props.oldName })
  }
  render() {
    const { fields: { newName }, oldName, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <p>Renaming <strong>{oldName}</strong> to</p>
        <Text field={newName} placeholder="new name" />
        <Button onClick={handleSubmit}>Rename</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'file',
  fields: ['newName'],
})(FileRenameForm)
