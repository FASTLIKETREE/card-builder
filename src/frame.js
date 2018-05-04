import { svg, mask, rect, polygon } from './svg'

// 20   <svg width='300' height='400'>
// 21     <mask id='mask3' x='0' y='0' width='300' height='400' >
// 22       <rect y='0'  width='300px' style='x:20px height:200px stroke:none fill: #ffffff'></rect>
// 23       <rect x='0' y='200' width='300' height='200' style='stroke:none fill: #666666'></rect>
// 24       <polyline id='hexagon' points='87,0 174,50 174,150 87,200 0,150 0,50 87,0' style='stroke:none fill: #111111'/>
// 25     </mask>
// 27       <rect x='0' y='0'  mask='url(#mask3)' width='300' height='400' style='stroke:none fill: #ff0000'></rect>
// 28   </svg>

class frame {
  constructor(shape) {
    this.svg = new svg()
    this.mask = new mask('frame')
    this.svg.setMask(this.mask)

    const bound = shape.getBoundingBox()
    let maskRect = new rect(bound.left - 3, bound.top - 3, bound.right - bound.left + 6, bound.bottom - bound.top + 6)
    this.mask.addSvgNode(maskRect)
    maskRect.setCssProperty('fill', '#ffffff')

    let fillRect = new rect(bound.left - 3, bound.top - 3, bound.right - bound.left + 6, bound.bottom - bound.top + 6)
    fillRect.setCssProperty('fill', '#ff55ff')
    fillRect.setMaskId('frame')
    this.svg.addSvgNode(fillRect)

    shape.setCssProperty('fill', '#000000')
    this.mask.addSvgNode(shape)
  }
  getHtml() {
    return this.svg.getHtml()
  }
}

// let svgContainer = new svg()
//  let svgMask = new mask('frame')
//  svgContainer.setMask(svgMask)
//
//  let maskRect = new rect(0, 0, 300, 400)
//  maskRect.setCssProperty('fill', '#ffffff')
//  svgMask.addSvgNode(maskRect)
//
//  let myPolygon = new polygon(5, 120, 150, 200, 22.5)
//
//  myPolygon.setCssProperty('fill', '#000000')
//  myPolygon.setCssProperty('top', '60px')
//  svgMask.addSvgNode(myPolygon)
//  
//  myPolygon.getBoundingBox
//
//  let myRect = new rect(0, 0, 300, 500)
//  myRect.setCssProperty('fill', '#ff55ff')
//  myRect.setMaskId('frame')
//  svgContainer.addSvgNode(myRect)
//
//  const svgHtml = svgContainer.getHtml()

export { frame }
