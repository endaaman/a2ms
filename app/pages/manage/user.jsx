import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getUsers, approveUser, rejectUser, deleteUser } from '../../actions/user'
import { isOnServer } from '../../utils'

import styles from '../../styles/table.css'

class ManageUser extends Component {
  static loadProps({dispatch}) {
    return dispatch(getUsers())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  approveUser(user, e) {
    if (isOnServer()) { return }
    e.preventDefault()

    if(window.confirm(`Are you sure to approve ${user.username}`)){
      this.props.dispatch(approveUser(user.id))
    }
  }
  rejectUser(user, e) {
    if (isOnServer()) { return }
    e.preventDefault()

    if(window.confirm(`Are you sure to reject ${user.username}`)){
      this.props.dispatch(rejectUser(user.id))
    }
  }
  deleteUser(user, e) {
    if (isOnServer()) { return }
    e.preventDefault()

    if(window.confirm(`Are you sure to delete ${user.username}`)){
      this.props.dispatch(deleteUser(user.id))
    }
  }

  render() {
    const { users, profile } = this.props
    return (
      <div>
        <h1>ユーザー管理</h1>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>状態</th>
                <th>承認/解除</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
            {
              users.map(user => {
                return(
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td className={styles.center}>
                      {
                        user.approved
                          ? 'active'
                          : 'inactive'
                      }
                    </td>
                    <td className={styles.center}>
                      {
                        profile.id == user.id
                          ? <span>n/a</span>
                          : user.approved
                            ? <a href="#" onClick={this.rejectUser.bind(this, user)}>reject</a>
                            : <a href="#" onClick={this.approveUser.bind(this, user)}>approve</a>
                      }
                    </td>
                    <td className={styles.center} onClick={this.deleteUser.bind(this, user)}>
                      {
                        profile.id == user.id
                          ? <span>n/a</span>
                          : <a href="#">delete</a>
                      }
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
  profile: state.session.user,
  users: state.users,
}))(ManageUser)
