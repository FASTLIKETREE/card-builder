import { parseCss } from './helper'

const sizeOf = promisify(imageSize);

class image {
  constructor(src){
    this.src = src
    this.css = {
      position: 'absolute',
      left: '0px',
      top: '0px'
    }
  }

  borderRadius(radius) {
    this.css['border-radius'] = radius
  }

  opacity(opacity) {
    this.css['opacity'] = opacity
  }

  left(left) {
    this.css['left'] = left
  }

  top(top) {
    this.css['top'] = top 
  }

  async getHtml() {
    const dimensions = await sizeOf(this.src)
    console.log(JSON.stringify(dimensions, null, 4))
    let wrapperDivStyle = `
      position:absolute;
      top:${this.css['top']};
      left:${this.css['left']};
      width:${dimensions.width};
      height:${dimensions.height};
      `
    wrapperDivStyle = wrapperDivStyle.replace(/\s+/g,'')
    return `<div style=${wrapperDivStyle}><img src="${this.src}" style="${parseCss(this.css)}"></img></div>`
  }

  //addTextNode
  //addImageNode
}

export { image }
