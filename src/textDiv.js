import { node } from './abstractNode'

class textDiv extends node {
  constructor(text) {
    super()
    this.text = text
  }

  getHtml() {
    this.setCssProperty('z-index', 1)
    const props = this.getPropertyString()
    return `<div style=${props}>${this.text}</div>`
  }
}

export { textDiv }
