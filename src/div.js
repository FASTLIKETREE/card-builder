
class div {
  constructor() {
    this.css = {
      left: '0px',
      top: '0px'
    }
  }

  left(left) {
    this.css['left'] = left
  }

  top(top) {
    this.css['top'] = top 
  }

  getHtml() {
    const wrapperDivStyle = `
      position:absolute;
      top:${this.css['top']};
      left:${this.css['left']};
      `
    return wrapperDivStyle
    //wrapperDivStyle = wrapperDivStyle.replace(/\s+/g,'')
    //return `<div style=${wrapperDivStyle}><img src="./img/${this.src}" style="${parseCss(this.css)}"></img></div>`
  }

  addTextNode
  addImageNode
}

export { div }
