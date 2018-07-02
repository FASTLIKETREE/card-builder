import fs from 'fs'
import { svg, mask, rect, polygon } from './svg'
import { container } from './container'

// 20   <svg width='300' height='400'>
// 21     <mask id='mask3' x='0' y='0' width='300' height='400' >
// 22       <rect y='0'  width='300px' style='x:20px height:200px stroke:none fill: #ffffff'></rect>
// 23       <rect x='0' y='200' width='300' height='200' style='stroke:none fill: #666666'></rect>
// 24       <polyline id='hexagon' points='87,0 174,50 174,150 87,200 0,150 0,50 87,0' style='stroke:none fill: #111111'/>
// 25     </mask>
// 27       <rect x='0' y='0'  mask='url(#mask3)' width='300' height='400' style='stroke:none fill: #ff0000'></rect>
// 28   </svg>

class frame extends container {
  constructor(shape) {
    super()
    this.svg = new svg()
    this.mask = new mask('frame')

    const frameId = uuidv4()

    //this.mask.setId(`frame${i}${j}`)
    this.mask.setId(frameId)

    this.svg.setMask(this.mask)
    this.boundingBox = shape.getBoundingBox()
    this.frame = this
    this.frameDimensions = {}
    
    // Save bounding box string in page to alert watcher of how to crop
    //this.boundingString = `<!-- ${Object.values(this.boundingBox).join(', ')} -->`
    this.setCssProperty('top', this.boundingBox.y)
    this.setCssProperty('left', this.boundingBox.x)
    this.setCssProperty('width', this.boundingBox.width)
    this.setCssProperty('height', this.boundingBox.height)

    //Setup watcher frame dimensions
    this.frameDimensions.top = this.boundingBox.y
    this.frameDimensions.left = this.boundingBox.x
    this.frameDimensions.width = this.boundingBox.width
    this.frameDimensions.height = this.boundingBox.height

    // Setup svg mask for frame
    let maskRect = new rect(
      this.boundingBox.x - 3, 
      this.boundingBox.y - 3,
      this.boundingBox.width + 6,
      this.boundingBox.height + 6)

    this.mask.addSvgNode(maskRect)
    maskRect.setCssProperty('fill', '#ffffff')

    let fillRect = new rect(
      this.boundingBox.x - 3, 
      this.boundingBox.y - 3,
      this.boundingBox.width + 6,
      this.boundingBox.height + 6)

    fillRect.setCssProperty('fill', '#ff55ff')
    fillRect.setMaskId(frameId)
    this.svg.addSvgNode(fillRect)

    shape.setCssProperty('fill', '#000000')
    this.mask.addSvgNode(shape)
  }

  getSvg() {
    return this.svg
  }

  getFrameDimensions() {
    return this.frameDimensions
  }

  getFrameDimensions() {
    return this.frameDimensions
  }

  getAnchors() {
    const anchorObject = this.getAnchorObject()
    const height = this.getCssProperty('height')

    //Set openGL coordinates to bottom left 0,0
    for (const key of Object.keys(anchorObject)) {
      anchorObject[key].y = height - anchorObject[key].y
    }

    return anchorObject
  }
}  

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export { frame }
