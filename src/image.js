import imageSize from 'image-size'
import { parseCss } from './helper'
import { promisify } from 'util'

const sizeOf = promisify(imageSize);

class image {
  constructor(src){
    this.src = src
    this.css = {
      position: 'absolute'
    }
  }

  borderRadius(radius) {
    this.css['border-radius'] = radius
  }

  opacity(opacity) {
    this.css['opacity'] = opacity
  }

  async getHtml() {
    const dimensions = await sizeOf(this.src)
    console.log(JSON.stringify(dimensions, null, 4))
    
    return `<div>outisde<img src="${this.src}" style="${parseCss(this.css)}"><div>inside</div></img>outside after</div>`
  }
}

export { image }
