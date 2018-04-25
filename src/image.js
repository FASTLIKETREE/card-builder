import { parseCss } from './helper'
import { imgStats } from './imgStats'


class image {
  constructor(src){
    const splitSrc = src.split('/')
    this.name = splitSrc[splitSrc.length - 1]
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

//  left(left) {
//    this.css['left'] = left
//  }
//
//  top(top) {
//    this.css['top'] = top 
//  }

  getHtml() {
    console.log(imgStats)
    let wrapperDivStyle = `
      position:absolute;
      top:${this.css['top']};
      left:${this.css['left']};
      width:${imgStats[this.name].width};
      height:${imgStats[this.name].height};
      `
    wrapperDivStyle = wrapperDivStyle.replace(/\s+/g,'')
    return `<div style=${wrapperDivStyle}><img src="./img/${this.src}" style="${parseCss(this.css)}"></img></div>`
  }

  //addTextNode
  //addImageNode
}

export { image }
