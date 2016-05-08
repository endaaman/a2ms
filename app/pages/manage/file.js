import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dateFormat from 'dateformat'

import Modal from '../../components/modal'
import { Button } from '../../components/controls'
import FileUploadForm from '../../forms/file/upload'
import FileRenameForm from '../../forms/file/rename'

import { getFiles, uploadFiles, deleteFile, renameFile } from '../../actions/file'
import { showToast } from '../../actions/toast'
import { formatByteSize } from '../../utils'

import styles from '../../styles/table.css'

class ManageFile extends Component {
  static loadProps({dispatch}) {
    return dispatch(getFiles())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  constructor(props) {
    super(props)
    this.state = {
      renameModalIsOpen: false,
      deleteModalIsOpen: false,
      targetFilename: null,
    }
  }

  toggleModal(type, dest, target, e) {
    if (e) {
      e.preventDefault()
    }
    const a = {
      targetFilename: target
    }
    a[`${type}ModalIsOpen`] = dest
    this.setState(a)
  }

  uploadFiles(data) {
    const { dispatch } = this.props
    dispatch(uploadFiles(data.files))
  }

  deleteFile() {
    const { dispatch } = this.props
    dispatch(deleteFile(this.state.targetFilename))
    .then(()=> {
      this.setState({
        deleteModalIsOpen: false,
        targetFilename: null,
      })
    })
  }

  renameFile(data) {
    const { dispatch } = this.props
    dispatch(renameFile(this.state.targetFilename, data.newName))
    .then(()=> {
      this.setState({
        renameModalIsOpen: false,
        targetFilename: null,
      })
    })
  }

  render() {
    const { files } = this.props
    return (
      <div>
        <Helmet
          title="File"
        />
        <h2>Files</h2>
        <FileUploadForm onSubmit={this.uploadFiles.bind(this)} />
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>size</th>
                <th>command</th>
                <th>updated</th>
              </tr>
            </thead>
            <tbody>
            {
              files.map(file => {
                return(
                  <tr key={file.name}>
                    <td><a href={`/static/${file.name}`}>{file.name}</a></td>
                    <td>{formatByteSize(file.size)}</td>
                    <td>
                      <a href="#" onClick={this.toggleModal.bind(this, 'rename', true, file.name)}>rename</a>
                      <span> / </span>
                      <a href="#" onClick={this.toggleModal.bind(this, 'delete', true, file.name)}>delete</a>
                    </td>
                    <td>{dateFormat(file.ctime, 'yyyy年m月d日')}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.toggleModal.bind(this, 'delete', false, null)}
          >
          <p>Are you sure to delete "<strong>{this.state.targetFilename}</strong>" ?</p>
          <Button onClick={this.deleteFile.bind(this)}>delete</Button>
        </Modal>

        <Modal
          isOpen={this.state.renameModalIsOpen}
          onRequestClose={this.toggleModal.bind(this, 'rename', false, null)}
          >
          <FileRenameForm
            oldName={this.state.targetFilename}
            onSubmit={this.renameFile.bind(this)} />
        </Modal>


      </div>
    )
  }
}

export default connect(state => ({
  files: state.files,
}))(ManageFile)
