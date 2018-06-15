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
    //console.log('adding image with name:' + name)
    //this.imgStats = imgStats[name]
    //console.log(this.imgStats)

    const stats = imgStats[name]
    if (!stats) {
      throw new Error(`image ${name} not found in image cache, run "gulp img" to add it.`)
    }

    const imgNode = new img(name)
    const containerNode = new container()

    containerNode.setCssProperty('width', stats.width)
    containerNode.setCssProperty('height', stats.height)
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
    const setLeft = targetX * parentWidth - fillXPixels/2 > 0 ? targetX * parentWidth - fillXPixels/2 : 0
    const setTop = targetY * parentHeight - fillYPixels/2 > 0 ? targetY * parentHeight - fillYPixels/2 : 0

    if (setLeft + fillXPixels > parentWidth) {
      this.setCssProperty('right', '0px')
    } else {
      this.setCssProperty('left', setLeft)
    }

    if (setTop + fillYPixels > parentHeight) {
      this.setCssProperty('bottom', '0px')
    } else {
      this.setCssProperty('top', setTop)
    }

    this.setCssProperty('overflow', 'hidden')

    this.getImgNode().setCssProperty('left', -imgLeft + fillXPixels/2)
    this.getImgNode().setCssProperty('top', -imgTop + fillYPixels/2)
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

  setAnchorPoint(name, x, y) {
    this.anchorPoint = { name, x, y }
  }
  
  getAnchorObject(anchorObj = {}) {
    for (const containerNode of this.containerNodes) {
      containerNode.getAnchorObject(anchorObj)
    }

    if (!this.anchorPoint) { return anchorObj }

    const name = this.anchorPoint.name
    let x = this.getCssProperty('width') * this.anchorPoint.x
    let y = this.getCssProperty('height') * this.anchorPoint.y

    const top = this.getCssProperty('top')
    const left = this.getCssProperty('left')
    const bottom = this.getCssProperty('bottom')
    const right = this.getCssProperty('right')


    while(1) {
      const parentContainer = this.getParentContainer()
      if(!parentContainer) {
        break
      }

      const top = this.getCssProperty('top')
      const left = this.getCssProperty('left')
      const bottom = this.getCssProperty('bottom')
      const right = this.getCssProperty('right')
    }

    anchorObj[name] = { x, y }
    return anchorObj
  }
  _getContainerParentOffset(
}

export { container }
