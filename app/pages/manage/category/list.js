import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getCategories } from '../../../actions/category'

import styles from '../../../styles/table.css'

class ManageCategoryList extends Component {
  static loadProps({dispatch}) {
    return dispatch(getCategories())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <h1>カテゴリ管理</h1>
        <p><Link to="/manage/category/new">新規追加</Link></p>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>基本</th>
                <th>優先度</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              categories.map(category => {
                const path = `/${category.slug}`
                return(
                  <tr key={category._id}>
                  <td>
                    <ul>
                      <li><code>日 : </code><Link to={path}>{category.name_ja}</Link></li>
                      <li><code>英 : </code><Link to={path + '?en'}>{category.name_en}</Link></li>
                      <li><code>URL: {path}</code></li>
                    </ul>
                  </td>
                    <td className={styles.center}>{category.order}</td>
                    <td className={styles.center}>
                      <Link to={`/manage/category/${category._id}`}>編集</Link>
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
  categories: state.category.items
}))(ManageCategoryList)
