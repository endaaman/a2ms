import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Button } from '../../../components/controls'
import Modal from '../../../components/modal'
import CategoryForm from '../../../forms/category'
import { showToast } from '../../../actions/toast'
import { getCategories, updateCategory, deleteCategory } from '../../../actions/category'
import { findItemById } from '../../../utils'

import styles from '../../../styles/table.css'

class ManageCategoryEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static loadProps({dispatch, params}) {
    return dispatch(getCategories())
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

  deleteCategory() {
    const { dispatch, category } = this.props
    dispatch(deleteCategory(category._id))
    .then(()=> {
      dispatch(showToast(`deleted "${category.name_ja}"`))
      this.context.router.push('/manage/category')
    }, err => {
      dispatch(showToast('Something wrong'))
    })
  }

  onSubmit(data) {
    const { dispatch, category } = this.props
    dispatch(updateCategory(category._id, data))
    .then((newCategory)=> {
      dispatch(showToast('正常に保存されました'))
      this.context.router.push(`/manage/category`)
    }, err => {
      dispatch(showToast('更新に失敗しました'))
    })
  }
  render() {
    const ok = ({ category })=> (
      <div>
        <h1>カテゴリの編集</h1>
        <p><Link to="/manage/category">一覧に戻る</Link></p>
        <CategoryForm category={category} onSubmit={this.onSubmit.bind(this)} />
        <hr />
        <p>このカテゴリに含まれる記事は、その関連が全て解除されます</p>
        <Button onClick={this.openModal.bind(this)}>Delete</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)} >
          <p>Are you sure to delete <strong>{category.name_ja}</strong> ?</p>
          <Button onClick={this.deleteCategory.bind(this)}>delete</Button>
          <hr />
          <Button onClick={this.closeModal.bind(this)}>cancel</Button>
        </Modal>
      </div>
    )
    const { category, notFound } = this.props
    return (
      <div>
        { notFound
          ? <p>カテゴリが見つかりませんでした</p>
          : category
            ? ok(this.props)
            : null
        }
      </div>
    )
  }
}


export default connect((state, ownProps) => {
  const item = findItemById(state.category.items, ownProps.params.id)
  return {
    category: item,
    notFound: state.category.items.length > 0 && !item
  }
})(ManageCategoryEdit)
