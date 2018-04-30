import { img } from './img'
import { textDiv } from './textDiv'
import { imgStats } from './imgStats'
import { node } from './abstractNode'

class container extends node {
  constructor() {
    super()
    this.html = ''
    this.containerNodes = []
    this.textNodes = []
  }

  addImage(name) {
    const stats = imgStats[name]
    if (!stats) {
      throw new Error(`image ${name} not found in image cache, run "gulp img" to add it.`)
    }

    const imgNode = new img(name)
    const containerNode = new container(stats.width, stats.height)
    imgNode.setContainerNode(containerNode)

    containerNode.setCssProperty('width', stats.width)
    containerNode.setCssProperty('height', stats.height)
    containerNode.setImgNode(imgNode)
    
    this.containerNodes.push(containerNode)
    return imgNode 
  }

  setImgNode(imgNode) {
    this.imgNode = imgNode
  }

  getImgNode() {
    return this.imgNode
  }

  addText(text) {
    const node = new textDiv(text)
    this.textNodes.push(node)
    return node
  }

  getHtml(depth = 0) {
    const indentation = '  '.repeat(depth)

    const propertyString = this.getPropertyString()
    const wrapperStyle = propertyString ? ` style=${propertyString}` : ''
    this.html += `${indentation}<div${wrapperStyle}>\n`

    if (this.imgNode) {
      this.html += `${indentation}  ${this.imgNode.getHtml()}\n`
    }

    for (const textNode of this.textNodes) {
      this.html += `${indentation}  ${textNode.getHtml()}\n`
    }

    for (const containerNode of this.containerNodes) {
      this.html += containerNode.getHtml(depth + 1)
    }
    this.html += `${indentation}</div>\n`

    return this.html
  }
}

export { container }
