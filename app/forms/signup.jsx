import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { Text, Checkbox, Button } from '../components/controls'


function validate(values) {
  const errors = {}
  return errors
}


class SignupForm extends Component {
  render() {
    const { fields: { username, password, reenteredPassword }, handleSubmit, disabled } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={ username } required={true} placeholder="username" />
        <Text field={ password } required={true} placeholder="password" type="password" />
        <Text field={ reenteredPassword } required={true} placeholder="confirm password" type="password" />
        <Button disabled={disabled}>Submit</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'reenteredPassword'],
  validate
})(SignupForm)
