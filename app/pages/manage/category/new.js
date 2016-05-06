import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import CategoryForm from '../../../forms/category'
import { showToast } from '../../../actions/toast'
import { getCategory, createCategory } from '../../../actions/category'

import styles from '../../../styles/table.css'

class ManageCategoryNew extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    const { dispatch, category } = this.props
    dispatch(createCategory(data))
    .then((newCategory)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/category`)
    }, err => {
      dispatch(showToast('作成に失敗しました'))
    })
  }
  render() {
    return (
      <div>
        <h1>カテゴリの新規作成</h1>
        <p><Link to="/manage/category">一覧に戻る</Link></p>
        <CategoryForm category={{}} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}


export default connect((state, ownProps) => ({
}))(ManageCategoryNew)
