import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import { uuid } from '../utils'
import styles from '../styles/controls.css'


export class Text extends Component {
  constructor(...props) {
    super(...props)
    this.state = {
      id: ''
    }
  }
  componentDidMount() {
    this.setState({
      id: uuid()
    })
  }
  render() {
    const { field, label, type, helpText, required, pattern } = this.props
    const { id } = this.state
    return (
      <div className={styles.text}>
        <input
          type={ ['text', 'password', 'number'].indexOf(type)
            ? type
            : 'text'
          }
          id={id}
          required={required ? 'true' : null}
          pattern={pattern || null}
          className={(label && field.value || field.value === 0) ? styles.filled : null}
          placeholder={label ? '' : this.props.placeholder}
          {...this.props.field} />
        { id ? <label htmlFor={id}>{label}</label> : null}
        { required ? <div className={styles.required}>必須</div> : null}
        <div className={styles.helpText}>{
          typeof helpText === 'function'
            ? helpText(field.value)
            : helpText
        }</div>
      </div>
    )
  }
}


export class Button extends Component {
  render() {
    return (
      <div className={styles.button}>
        <button {...this.props}>{this.props.children}</button>
      </div>
    )
  }
}


export class Checkbox extends Component {
  constructor(...props) {
    super(...props)
    this.state = {
      id: ''
    }
  }
  componentDidMount() {
    this.setState({
      id: uuid()
    })
  }
  render() {
    const { field, label } = this.props
    const { id } = this.state
    return (
      <div className={styles.checkbox}>
        <input
          id={this.state.id}
          type="checkbox"
          {...field} />
        <label htmlFor={this.state.id}>{label}</label>
      </div>
    )
  }
}


export class Select extends Component {
  render() {
    const { field, options } = this.props
    return (
      <div className={styles.select}>
        <select {...field} value={field.value || ''}>
          {
            options.map(opt => {
              return(
                <option key={opt.value} value={opt.value}>{opt.text}</option>
                )
              })
          }
        </select>
      </div>
    )
  }
}


export class Editor extends Component {
  render() {
    const { field } = this.props
    return (
      <div className={styles.editor}>
        <Textarea
          {...field}
          placeholder={this.props.placeholder}></Textarea>
      </div>
    )
  }
}
