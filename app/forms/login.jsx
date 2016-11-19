import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { Text, Checkbox, Button } from '../components/controls'



class LoginForm extends Component {
  render() {
    const { fields: {username, password}, handleSubmit, disabled } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={username} placeholder="username" />
        <Text field={password} placeholder="password" type="password" />
        <Button disabled={disabled} onClick={handleSubmit}>Submit</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})(LoginForm)
