import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Select } from '../../../components/controls'
import { getArticles } from '../../../actions/article'
import { getCategories } from '../../../actions/category'
import { findItemById, getArticlePath, makeCategoryOptions } from '../../../utils'

import styles from '../../../styles/table.css'
import { listInline } from '../../../styles/utils.css'

class ManageArticleList extends Component {
  static loadProps({dispatch}) {
    return dispatch(getArticles())
    .then(dispatch(getCategories()))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  constructor(props) {
    super(props)
    this.state = {
      categoryFilter: 'all',
      draftFilter: 'all'
    }
  }

  filterArticles(aa) {
    return aa.filter(a => {
      let ok = true
      if (this.state.categoryFilter !== 'all') {
        ok = this.state.categoryFilter === ''
          ? !a.category
          : a.category === this.state.categoryFilter
      }
      if (!ok) {
        return false
      }
      if (this.state.draftFilter !== 'all') {
        ok = this.state.draftFilter === 'draft'
          ? a.draft
          : !a.draft
      }
      return ok
    })
  }

  onChangeCategoryFilter(e) {
    this.setState({
      categoryFilter: e.target.value,
    })
  }

  onChangeDraftFilter(e) {
    this.setState({
      draftFilter: e.target.value,
    })
  }


  render() {
    const { articles, categories } = this.props
    const filteredArticle = this.filterArticles(articles)
    const categoryOptions = makeCategoryOptions(categories)
    categoryOptions.unshift({
      text: '全カテゴリ',
      value: 'all',
    })
    const draftOptions = [
      {
        text: '下書き・公開',
        value: 'all',
      }, {
        text: '公開のみ',
        value: 'published',
      }, {
        text: '下書きのみ',
        value: 'draft',
      }
    ]

    return (
      <div>
        <h1>記事管理</h1>
        <p><Link to="/manage/article/new">新規追加</Link></p>

        <ul className={listInline}>
          <li><Select options={categoryOptions} field={{
            onChange: this.onChangeCategoryFilter.bind(this),
            value: this.state.categoryFilter,
          }} /></li>
          <li><Select options={draftOptions} field={{
            onChange: this.onChangeDraftFilter.bind(this),
            value: this.state.draftFilter,
          }} /></li>
        </ul>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>基本</th>
                <th>カテゴリ</th>
                <th>優先度</th>
                <th>状態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              filteredArticle.map(article => {
                let category = null
                if (categories.length > 0) {
                  category = findItemById(categories, article.category) || category
                }
                const path = `/${ category ? category.slug : '-'}/${article.slug}`
                return(
                  <tr key={article._id}>
                    <td>
                      <ul>
                        <li><code>日 : </code><Link to={path}>{article.title_ja}</Link></li>
                        <li><code>英 : </code><Link to={path + '?en'}>{article.title_en}</Link></li>
                        <li><code>URL: {path}</code></li>
                      </ul>
                    </td>
                    { category
                      ? <td><Link to={`/manage/category/${category._id}`}>{category.name_ja}</Link></td>
                      : <td>未分類</td>
                    }
                    <td className={styles.center}>{article.order}</td>
                    <td className={styles.center}>
                      { article.draft ? '下書き' : '公開' }
                    </td>
                    <td className={styles.center}>
                      <Link to={`/manage/article/${article._id}`}>編集</Link>
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
  articles: state.article.items,
  categories: state.category.items,
}))(ManageArticleList)
