import { imgStats } from './imgStats'
import { node } from './abstractNode'

class img extends node {
  constructor(name) {
    super()
    this.name = name
  }
 
  getHtml() {
    const props = this.getPropertyString()
    const imgSource = `${__dirname}/img/${this.name}.${imgStats[this.name].type}`
    return `<img src=${imgSource} style=${props}>`
  }
}

export { img }
