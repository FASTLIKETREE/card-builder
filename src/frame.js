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
    this.svg.setMask(this.mask)
    this.boundingBox = shape.getBoundingBox()
    this.frame = this
    
    // Save bounding box string in page to alert watcher of how to crop
    this.boundingString = `<!-- ${Object.values(this.boundingBox).join(', ')} -->`
    this.setCssProperty('top', this.boundingBox.y)
    this.setCssProperty('left', this.boundingBox.x)
    this.setCssProperty('width', this.boundingBox.width)
    this.setCssProperty('height', this.boundingBox.height)

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
    fillRect.setMaskId('frame')
    this.svg.addSvgNode(fillRect)

    shape.setCssProperty('fill', '#000000')
    this.mask.addSvgNode(shape)
  }

  save(name) {
    const anchorObject = this.getAnchorObject()
    console.log(anchorObject)
    fs.writeFileSync(`./${name}.js`, JSON.stringify(anchorObject, null, 2))
  
const html = `${this.boundingString}
<html>
  <style>
    * {
      position: absolute
    }
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  </style>
  <script>
    document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    document.title = 'X is ' + x + ' and Y is ' + y;
    }
  </script>
  <body>
    ${this.getHtml()}
    ${this.svg.getHtml()}
  </body>
</html>`
    fs.writeFileSync('./card.html', html)
  }
}

export { frame }
