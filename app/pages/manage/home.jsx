import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import styles from '../../styles/manage.css'

class ManageHome extends Component {
  render() {
    return (
      <div>
        <h1>管理トップ</h1>
        <h3><Link to="/manage/article">記事</Link></h3>
        <p>記事の投稿・編集・削除を行います。</p>
        <h3><Link to="/manage/category">カテゴリ</Link></h3>
        <p>カテゴリの追加・編集・削除を行います。</p>
        <h3><Link to="/manage/news">お知らせ</Link></h3>
        <p>お知らせの追加・編集・削除を行います。</p>
        <h3><Link to="/manage/file">ファイル</Link></h3>
        <p>ファイルのアップロード・削除を行います。</p>
      </div>
    )
  }
}

export default connect(state => ({
}))(ManageHome)
