import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import ArticleForm from '../../../forms/article'
import { showToast } from '../../../actions/toast'
import { createArticle } from '../../../actions/article'
import { getCategories } from '../../../actions/category'

import styles from '../../../styles/table.css'

class ManageArticleNew extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static loadProps({dispatch, params}) {
    return dispatch(getCategories())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  onSubmit(data) {
    const { dispatch, article } = this.props
    dispatch(createArticle(data))
    .then((newArticle)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/article`)
    }, err => {
      dispatch(showToast('作成に失敗しました'))
    })
  }
  render() {
    const { categories } = this.props
    return (
      <div>
        <h1>記事の新規作成</h1>
        <p><Link to="/manage/article">一覧に戻る</Link></p>
        <ArticleForm article={{}} categories={categories} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}


export default connect((state) => ({
  categories: state.category.items,
}))(ManageArticleNew)
