import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import Modal from '../../../components/modal'
import NewsForm from '../../../forms/news'
import { showToast } from '../../../actions/toast'
import { getNewss, updateNews, deleteNews } from '../../../actions/news'
import { findItemById } from '../../../utils'

import styles from '../../../styles/table.css'

class ManageNewsEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static loadProps({dispatch, params}) {
    return dispatch(getNewss())
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

  deleteNews() {
    const { dispatch, news } = this.props
    dispatch(deleteNews(news.id))
    .then(()=> {
      dispatch(showToast(`deleted`))
      this.context.router.push('/manage/news')
    }, err => {
      dispatch(showToast('Something wrong'))
    })
  }

  onSubmit(data) {
    const { dispatch, news } = this.props
    dispatch(updateNews(news.id, data))
    .then((newNews)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/news`)
    }, err => {
      dispatch(showToast('更新に失敗しました'))
    })
  }
  render() {
    const ok = (news)=> (
      <div>
        <h1>カテゴリの編集</h1>
        <p><Link to="/manage/news">一覧に戻る</Link></p>
        <NewsForm news={news} onSubmit={this.onSubmit.bind(this)} />
        <hr />
        <Button onClick={this.openModal.bind(this)}>Delete</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)} >
          <p>Are you sure to delete this?</p>
          <Button onClick={this.deleteNews.bind(this)}>delete</Button>
          <hr />
          <Button onClick={this.closeModal.bind(this)}>cancel</Button>
        </Modal>
      </div>
    )
    const { news, notFound } = this.props
    return (
      <div>
        { notFound
          ? <p>カテゴリが見つかりませんでした</p>
          : news
            ? ok(news)
            : null
        }
      </div>
    )
  }
}


export default connect((state, ownProps) => {
  const item = findItemById(state.news.items, ownProps.params.id)
  return {
    news: item,
    notFound: state.news.items.length > 0 && !item
  }
})(ManageNewsEdit)
