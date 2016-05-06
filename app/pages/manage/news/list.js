import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import { getNewss } from '../../../actions/news'

import styles from '../../../styles/table.css'

class ManageNewsList extends Component {
  static loadProps({dispatch}) {
    return dispatch(getNewss())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  render() {
    const { newss } = this.props
    return (
      <div>
        <h1>お知らせ管理</h1>
        <p><Link to="/manage/news/new">新規追加</Link></p>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>文章</th>
                <th>日付</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              newss.map(news => {
                return(
                  <tr key={news._id}>
                    <td>
                      <ul>
                        <li><code>日: </code>{news.message_ja}</li>
                        <li><code>英: </code>{news.message_en}</li>
                      </ul>
                    </td>
                    <td>{dateFormat(news.date, 'yyyy年mm月dd日')}</td>
                    <td className={styles.center}>
                      <Link to={`/manage/news/${news._id}`}>編集</Link>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default connect(state => ({
  newss: state.news.items
}))(ManageNewsList)
