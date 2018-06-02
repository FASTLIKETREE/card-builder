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
    //const containerNode = new container(stats.width, stats.height)
    const containerNode = new container()

    containerNode.setCssProperty('width', stats.width)
    containerNode.setCssProperty('height', stats.height)
    console.log('setting bowman img node?')
    containerNode.setImgNode(imgNode)
    containerNode.setParentContainer(this)
    
    this.containerNodes.push(containerNode)
    return containerNode
  }

  setParentContainer(node) {
    this.parentContainer = node
  }

  getParentContainer() {
    return this.parentContainer
  }

  setImgNode(imgNode) {
    this.imgNode = imgNode
  }

  getImgNode() {
    return this.imgNode
  }

  centerImagePoint(imgLeft = 0, imgTop = 0, targetX = 0, targetY = 0, fillX = 1, fillY = 1) {
    if(typeof targetX != 'number' || targetX < 0 || targetX > 1) throw new Error(`Invalid targetX input ${targetX}`)
    if(typeof targetY != 'number' || targetY < 0 || targetY > 1) throw new Error(`Invalid targetY input ${targetY}`)
    if(typeof fillX != 'number' || fillX < 0 || fillX > 1) throw new Error(`Invalid fillX input ${fillX}`)
    if(typeof fillY != 'number' || fillY < 0 || fillY > 1) throw new Error(`Invalid fillY input ${fillY}`)

    const parentWidth = this.getParentContainer().getCssProperty('width')
    const parentHeight = this.getParentContainer().getCssProperty('height')

    //const width = this.getCssProperty('width')
    //const height = this.getCssProperty('height')

    const fillXPixels = fillX * parentWidth
    const fillYPixels = fillY * parentHeight

    this.setCssProperty('width', fillXPixels)
    this.setCssProperty('height', fillYPixels)
    this.setCssProperty('overflow', 'hidden')
  
    this.getImgNode().setCssProperty('left', -imgLeft)
    this.getImgNode().setCssProperty('top', -imgTop)

    //let clipTop = imgTop - fillYPixels/2
    //let clipRight = width - imgLeft - fillXPixels/2
    //let clipBottom = height - imgTop - fillYPixels/2
    //let clipLeft = imgLeft - fillXPixels/2 

    //const overflowTop = fillYPixels/2 - (targetY * parentHeight) > 0 ? fillYPixels/2 - (targetY * parentHeight) : 0
    //const overflowRight = fillXPixels/2 + (targetX * parentWidth) > parentWidth ? fillXPixels/2 + (targetX * parentWidth) - parentWidth : 0
    //const overflowBottom = fillYPixels/2 + (targetY * parentHeight) > parentHeight ? fillYPixels/2 + (targetY * parentHeight) - parentHeight : 0
    //const overflowLeft = fillXPixels/2 - (targetX * parentWidth) > 0 ? fillXPixels/2 - (targetX * parentWidth) : 0

    //if (overflowTop) {
    //  clipTop += overflowTop
    //  clipBottom -= overflowTop
    //}

    //if (overflowRight) {
    //  clipRight += overflowRight
    //  clipLeft -= overflowRight
    //}

    //if (overflowBottom) {
    //  clipBottom += overflowBottom 
    //  clipTop -= overflowBottom
    //}

    //if (overflowLeft) {
    //  clipLeft += overflowLeft
    //  clipRight -= overflowLeft
    //}

    //console.log(clipRight + '<-- clipRight')
    //console.log(clipLeft + '<-- clipLeft')
    //console.log(overflowTop + '<-- overflowTop')
    //console.log(overflowRight + '<-- overflowRight')
    //console.log(overflowBottom + '<-- overflowBottom')
    //console.log(overflowLeft + '<-- overflowLeft')

    //Position the image
    //const centerX = targetX * parentWidth
    //const centerY = targetY * parentHeight

    //this.setCssProperty('left', `${centerX - imgLeft}px`) 
    //this.setCssProperty('top', `${centerY - imgTop}px`) 

    /* values are from-top, from-right, from-bottom, from-left */

    //this.setCssProperty('clip-path', `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`)
  
    //this.translateContainer = new container()
    //this.translateContainer.setCssProperty('width', fillXPixels)
    //this.translateContainer.setCssProperty('height', fillYPixels)
    //this.translateContainer.setCssProperty('left', `${centerX - imgLeft}px`) 
    //this.translateContainer.setCssProperty('top', `${centerY - imgTop}px`) 
    //this.translateContainer.setCssProperty('left', `${clipLeft}px`) 
    //this.translateContainer.setCssProperty('top', `${clipTop}px`) 
  }

  addText(text) {
    const node = new textDiv(text)
    node.setCssProperty('left', this.getCssProperty('left'))
    node.setCssProperty('top', this.getCssProperty('top'))

    //if (this.translateContainer) {
    //  node.setCssProperty('left', this.translateContainer.getCssProperty('left'))
    //  node.setCssProperty('top', this.translateContainer.getCssProperty('top'))
    //  node.setCssProperty('width', this.translateContainer.getCssProperty('width'))
    //  node.setCssProperty('height', this.translateContainer.getCssProperty('height'))

    //  this.textNodes.push(node)
    //} else {
    //  node.setCssProperty('left', this.getCssProperty('left'))
    //  node.setCssProperty('top', this.getCssProperty('top'))
    //  this.textNodes.push(node)
    //}
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
