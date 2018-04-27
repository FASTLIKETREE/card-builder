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
    const imgNode = new img(name)
    const containerNode = new container(stats.width, stats.height)

    containerNode.setCssProperty('width', stats.width)
    containerNode.setCssProperty('height', stats.height)
    containerNode.setContainerImg(imgNode)
    //containerNode.addImageNode(containerNode)
    //containerNode.addContainerNode(imgNode)

    //this.imgNodes.push(node)
    this.containerNodes.push(containerNode)
    return { 'containerNode': containerNode, 'imgNode': imgNode }
  }

  setContainerImg(imgNode) {
    this.imgNode = imgNode
  }

  addText(text) {
    const node = new textDiv(text)
    this.textNodes.push(node)
    return { 'textNode': node }
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
      this.html += `${indentation}${containerNode.getHtml(depth + 1)}\n`
    }
    this.html += `${indentation}</div>`

    return this.html
  }
}

export { container }

//  <div>
//    <div id='wrap0' style='position:absolute;width:256px;height:256px'>
//      <img src='https://cdn1.iconfinder.com/data/icons/legend-of-zelda-link-to-the-past/512/bow-256.png'>
//      <div class='container font' id='text0'>Text0 a bunch of shit how far doe sthis goes and stlsjda;lkgjsdl;</div>
//      <div class='container2 font' id='text1'>Text1</div>
//      <div id='wrap1' style='position:absolute;width:256px;height:256px;top:300px'>
//        <img src='https://cdn1.iconfinder.com/data/icons/legend-of-zelda-link-to-the-past/512/bow-256.png'>
//        <div class='container font' id='text0'>inner text0</div>
//        <div id='text1'>inner text1</div>
//        <div id='text2'>inner text2</div>
//      </div>
//    </div>
//  </div>

