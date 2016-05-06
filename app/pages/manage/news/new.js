import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import NewsForm from '../../../forms/news'
import { showToast } from '../../../actions/toast'
import { getNews, createNews } from '../../../actions/news'

import styles from '../../../styles/table.css'

class ManageNewsNew extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    const { dispatch, news } = this.props
    dispatch(createNews(data))
    .then((newNews)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/news`)
    }, err => {
      dispatch(showToast('作成に失敗しました'))
    })
  }
  render() {
    return (
      <div>
        <h1>お知らせの新規作成</h1>
        <p><Link to="/manage/news">一覧に戻る</Link></p>
        <NewsForm news={{}} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}


export default connect((state, ownProps) => ({
}))(ManageNewsNew)
