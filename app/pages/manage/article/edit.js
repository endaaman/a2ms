import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import Modal from '../../../components/modal'
import ArticleForm from '../../../forms/article'
import { showToast } from '../../../actions/toast'
import { getArticles, updateArticle, deleteArticle } from '../../../actions/article'
import { getCategories } from '../../../actions/category'
import { findItemById } from '../../../utils'

import styles from '../../../styles/table.css'

class ManageArticleEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static loadProps({dispatch, params}) {
    return dispatch(getArticles())
    .then(dispatch(getCategories()))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
  }

  openModal(e) {
    e.preventDefault()
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal(e) {
    if (e) {
      e.preventDefault()
    }
    this.setState({
      modalIsOpen: false
    })
  }

  deleteArticle() {
    const { dispatch, article } = this.props
    const articleName = article.name_ja
    dispatch(deleteArticle(article._id))
    .then(()=> {
      dispatch(showToast(`deleted "${articleName}"`))
      this.context.router.push('/manage/article')
    }, err => {
      dispatch(showToast('Something wrong'))
    })
  }

  onSubmit(data) {
    const { dispatch, article } = this.props
    dispatch(updateArticle(article._id, data))
    .then((newArticle)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/article`)
    }, err => {
      dispatch(showToast('更新に失敗しました'))
    })
  }
  render() {
    const ok = ({ article, categories })=> (
      <div>
        <h1>記事の編集</h1>
        <p><Link to="/manage/article">一覧に戻る</Link></p>
        <ArticleForm article={article} categories={categories} onSubmit={this.onSubmit.bind(this)} />
        <hr />
        <p>このカテゴリに含まれる記事は、その関連が全て解除されます</p>
        <Button onClick={this.openModal.bind(this)}>Delete</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          >
          <p>Are you sure to delete <strong>{article.title_ja}</strong> ?</p>
          <Button onClick={this.deleteArticle.bind(this)}>delete</Button>
          <hr />
          <Button onClick={this.closeModal.bind(this)}>cancel</Button>
        </Modal>
      </div>
    )
    const { article, notFound, categories } = this.props

    return (
      <div>
        { article._id
          ? ok(this.props)
          : this.props
            ? <p>記事が見つかりませんでした</p>
            : null
        }
      </div>
    )
  }
}


export default connect((state, ownProps) => ({
  resolved: state.article.items.length > 0,
  article: findItemById(state.article.items, ownProps.params.id, {}),
  categories: state.category.items,
}))(ManageArticleEdit)
