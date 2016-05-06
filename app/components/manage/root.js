import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dateFormat from 'dateformat'

import styles from '../../styles/manage.css'

class ManageRoot extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="管理"
        />
        <div className={styles.sidebar}>
          <h1>管理</h1>
          <p><Link to="/">トップページに戻る</Link></p>
          <p>{this.props.user.username}としてログインしています</p>
          <ul>
            <li><Link to="/manage">管理トップ</Link></li>
            <li><Link to="/manage/article">記事</Link></li>
            <li><Link to="/manage/category">カテゴリ</Link></li>
            <li><Link to="/manage/news">お知らせ</Link></li>
            <li><Link to="/manage/file">ファイル</Link></li>
            {
              this.props.user.admin
                ? <li><Link to="/manage/user">ユーザー</Link></li>
                : null
            }
          </ul>
        </div>
        <div className={styles.main}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.session.user || {},
}))(ManageRoot)
