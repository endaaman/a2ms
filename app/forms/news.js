import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import DatePicker from 'react-date-picker'
import { Text, Checkbox, Editor, Button } from '../components/controls'

function validate(values) {
  const errors = {}
  return errors
}



class CategoryForm extends Component {
  componentWillMount() {
    const now = new Date()
    const {
      message_ja = '',
      message_en = '',
      url = '',
      date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0),
    } = this.props.news
    this.props.initializeForm({ message_ja, message_en, url, date })
  }
  render() {
    const { fields: { message_ja, message_en, url, date }, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={ message_ja } label="日本語のお知らせ文" required={true} />
        <Text field={ message_en } label="英語のお知らせ文" required={true} />
        <Text field={ url } label="お知らせのリンク"　/>
        <DatePicker
          minDate='2015-01-01'
          maxDate='2100-01-01'
          date={date.value}
          onChange={date.onChange} />
        <p>{/* marngin */}</p>
        <Button>Save</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'category',
  fields: ['message_ja', 'message_en', 'url', 'date'],
  validate
})(CategoryForm)
