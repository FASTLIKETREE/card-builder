import { node } from './abstractNode'

class textDiv extends node {
  constructor(text) {
    super()
    this.text = text
  }

  getHtml() {
    debugger
    const props = this.getPropertyString()
    return `<div style=${props}>${this.text}</div>`
  }
}

export { textDiv }
