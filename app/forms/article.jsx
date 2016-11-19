import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'

import { getCategories } from '../actions/category'
import { Text, Checkbox, Editor, Button, Select, Numeric } from '../components/controls'
import { makeCategoryOptions, getArticlePath } from '../utils'


function validate(values) {
  const errors = {}
  return errors
}

class ArticleForm extends Component {
  componentWillMount() {
    const {
      slug = '',
      title_ja = '',
      title_en = '',
      order = 0,
      draft = false,
      image_url = '',
      category_id = '',
      content_ja = '',
      content_en = '',
      comment = '',
    } = this.props.article
    this.props.initializeForm({ slug, title_ja, title_en, order, draft, image_url, category_id, content_ja, content_en, comment })
  }
  render() {
    const { fields: { slug, title_ja, title_en, order, draft, image_url, category_id, content_ja, content_en, comment }, categories, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Text field={ slug } label="URL" required={true} pattern="[a-z0-9_-]{2,}"
          helpText={ value => value && `http://a2ms.med.hokudai.ac.jp${getArticlePath(slug.value, categories, category_id.value)} がURLとして使用されます`}/>
        <Text field={ title_ja } label="日本語のタイトル" required={true} />
        <Text field={ title_en } label="英語のタイトル" required={true} />
        <Text field={ order }  type="number" label="表示順序（大きいほど上に表示されます）" required={true} />
        <Checkbox field={ draft } label="下書き（チェックを入れると非公開になります）" required={true} />
        <Text field={ image_url } label="アイキャッチに使われる画像のURL" placeholder="画像のURL" />
        <Select field={ category_id } options={makeCategoryOptions(categories, '未分類')} />
        <Tabs>
          <TabList>
            <Tab>日本語</Tab>
            <Tab>英語</Tab>
            <Tab>コメント</Tab>
            <Tab>ヘルプ</Tab>
          </TabList>
          <TabPanel>
            <Editor field={ content_ja } placeholder="日本語の本文" />
          </TabPanel>
          <TabPanel>
            <Editor field={ content_en } placeholder="英語の本文" />
          </TabPanel>
          <TabPanel>
            <Editor field={ comment } placeholder="記事を書くにあたって連絡事項やメモのためのスペースです。ここに書かれた内容は保存されますが、公開はされません" />
          </TabPanel>
          <TabPanel>
            <p>翻訳がまだないばあいは英語もしくは日本語の本文は何も入力しないでください。</p>
          </TabPanel>
        </Tabs>


        <Button>Save</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'article',
  fields: ['slug', 'title_ja', 'title_en', 'order', 'draft', 'image_url', 'category_id', 'content_ja', 'content_en', 'comment'],
  validate
})(ArticleForm)
