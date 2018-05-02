import fs from 'fs'
import { container } from './container'
import { svg, mask, rect, polygon } from './svg'

 process.on('unhandledRejection', r => console.log(r));

// 20   <svg width='300' height='400'>
// 21     <mask id='mask3' x='0' y='0' width='300' height='400' >
// 22       <rect y='0'  width='300px' style='x:20px height:200px stroke:none fill: #ffffff'></rect>
// 23       <rect x='0' y='200' width='300' height='200' style='stroke:none fill: #666666'></rect>
// 24       <polyline id='hexagon' points='87,0 174,50 174,150 87,200 0,150 0,50 87,0' style='stroke:none fill: #111111'/>
// 25     </mask>
// 26       
// 27       <rect x='0' y='0'  mask='url(#mask3)' width='300' height='400' style='stroke:none fill: #ff0000'></rect>
// 28   </svg>

      //<polyline id="hexagon" mask="url(#mask3)" fill='rgba(255,255,255, 1)' points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"/>
function card(){

  let svgContainer = new svg()
  svgContainer.setCssProperty('width', '300px')
  svgContainer.setCssProperty('height', '500px')
  svgContainer.setCssProperty('x', '50px')
  svgContainer.setCssProperty('y', '50px')

  let svgMask = new mask('frame')
  svgMask.setCssProperty('width', '300')
  svgMask.setCssProperty('height', '500')
  svgMask.setCssProperty('x', '50px')
  svgMask.setCssProperty('y', '50px')
  //svgMask.setCssProperty('fill', 'rgba(255, 100, 255, 1)')
  svgContainer.setMask(svgMask)

  let maskRect = new rect(0, 0, 300, 500)
  maskRect.setCssProperty('fill', '#ffffff')
  svgMask.addSvgNode(maskRect)

  let myPolygon = new polygon(3, 120, 150, 200, 22.5)

  myPolygon.setCssProperty('fill', '#000000')
  myPolygon.setCssProperty('top', '60px')
  svgMask.addSvgNode(myPolygon)

  let myRect = new rect(0, 0, 300, 500)
  myRect.setCssProperty('fill', '#ff55ff')
  myRect.setMaskId('frame')
  svgContainer.addSvgNode(myRect)


  const svgHtml = svgContainer.getHtml()

  let textNode 
  let card = new container()
  let imgNode = card.addImage('laboratory')
  imgNode.setCssProperty('border-radius', '40%')

  let containerNode = imgNode.getContainerNode()
  imgNode = containerNode.addImage('star')
  let container1 = imgNode.getContainerNode()

  container1.setCssProperty('bottom', '10px')
  container1.setCssProperty('right', '10px')

  textNode = container1.addText('X')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('color', 'white')
  textNode.setCssProperty('font-size', '40px')
  textNode.setCssProperty('text-align', 'center')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  textNode = containerNode.addText('Inner container node text WOOHO')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '60%')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')
  textNode.setCssProperty('color', 'pink')

  textNode = containerNode.addText('I LOVE SWEETIE')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('color', 'white')
  textNode.setCssProperty('font-size', '40px')
  textNode.setCssProperty('text-align', 'center')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  const cardHtml = card.getHtml()

  const html = `
  <html>
    <style>
      * {
        position: absolute
      }
    </style>
    <body>
${cardHtml}
${svgHtml}
    </body>
  </html>`

  fs.writeFileSync('./card.html', html)
}

card()
