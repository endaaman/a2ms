import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Text, Checkbox, Editor, Button } from '../components/controls'

function validate(values) {
  const errors = {}
  return errors
}



class CategoryForm extends Component {
  componentWillMount() {
    const {
      slug = '',
      name_ja = '',
      name_en = '',
      order = '',
      image_url = '',
      desc_ja = '',
      desc_en = '',
    } = this.props.category
    this.props.initializeForm({ slug, name_ja, name_en, order, image_url, desc_ja, desc_en })
  }
  render() {
    const { fields: { slug, name_ja, name_en, order, image_url, desc_ja, desc_en }, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={ slug } label="URLに使われるキーワードです" required={true} pattern="[a-z0-9_-]{2,}"
          helpText={value =>(value && `/${value} がURLとして使用されます`)}/>
        <Text field={ name_ja } label="日本語カテゴリーの名" required={true} />
        <Text field={ name_en } label="英語のカテゴリーの名" required={true} />
        <Text field={ order }  type="number" label="表示順序（大きいほど上に表示されます）" />
        <Text field={ image_url } label="アイキャッチに使われる画像のURL" placeholder="画像のURL" />
        <Text field={ desc_ja } label="日本語のカテゴリーの説明" />
        <Text field={ desc_en } label="英語のカテゴリーの説明" />
        <Button>Save</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'category',
  fields: ['slug', 'name_ja', 'name_en', 'order', 'image_url', 'desc_ja', 'desc_en'],
  validate
})(CategoryForm)
