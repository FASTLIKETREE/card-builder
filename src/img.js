import { imgStats } from './imgStats'
import { node } from './abstractNode'

class img extends node {
  constructor(name) {
    super()
    this.name = name
  }
  
  addImage(name) {
    return this.containerNode.addImage(name)
  }

  addText(text) {
    return this.containerNode.addText(text)
  }

  setContainerNode(node) {
    this.containerNode = node
  }

  getContainerNode() {
    return this.containerNode
  }

  setCssProperty(key, value) {
    if (key == 'top' ||
    key == 'left' ||
    key == 'bottom' || 
    key == 'right') {
      this.containerNode.setCssProperty(key, value)
    } else {
      Object.getPrototypeOf(this.constructor.prototype).setCssProperty.call(this, key, value);
    }
  }

  getHtml() {
    const props = this.getPropertyString()
    const imgSource = `${__dirname}/img/${this.name}.${imgStats[this.name].type}`
    return `<img src=${imgSource} style=${props}>`
  }
}

export { img }
