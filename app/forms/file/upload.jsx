import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { formatByteSize } from '../../utils'
import { Button } from '../../components/controls'

import { listInline } from '../../styles/utils.css'


class FileUploadForm extends Component {
  componentWillMount() {
    this.props.initializeForm({files: []})
  }

  click(e) {
    this.refs.input.click()
    e.preventDefault();
  }
  selectFiles(e) {
    e.preventDefault()
    const filed = this.props.fields.files
    const files = [ ...e.target.files ]
    filed.value = files
    filed.onChange(files)
  }

  clearFiles(e) {
    if (e) {
      e.preventDefault()
    }
    const filed = this.props.fields.files
    filed.value =[]
    filed.onChange([])
  }

  innerSubmit(e) {
    this.clearFiles()
    this.props.handleSubmit(e)
  }

  render() {
    const { fields: { files } } = this.props
    return (
      <form onSubmit={this.innerSubmit.bind(this)}>
        {
          files.value && files.value.length > 0
            ? (<ul>
              { files.value.map(file=>(
                  <li key={file.name}>
                    <strong>{file.name}</strong>
                    <span>({formatByteSize(file.size)})</span>
                  </li>
                ))

              }
            </ul>)
            : <p>No files selected</p>
        }
        <input type="file" ref="input" onChange={this.selectFiles.bind(this)} multiple style={{display: 'none'}}/>
        <ul className={listInline}>
          <li><Button onClick={this.click.bind(this)}>Select files</Button></li>
          { files.value && files.value.length > 0
              ? <li><Button onClick={this.clearFiles.bind(this)}>Clear files</Button></li>
              : null
          }
          { files.value && files.value.length > 0
              ? <li><Button>Upload</Button></li>
              : null
          }
        </ul>

      </form>
    )
  }
}

export default reduxForm({
  form: 'file',
  fields: ['files'],
})(FileUploadForm)
