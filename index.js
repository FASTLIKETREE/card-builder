import fs from 'fs'
import { container } from './container'

async function card(){
  let textNode 
  let card = new container()
  //const { containerNode, imgNode } = card.addImage('laboratory')
  let imgNode = card.addImage('laboratory')
  //imgNode.setCssProperty('border-radius', '40%')
  //imgNode.setCssProperty('width', '100px')

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
  console.log(cardHtml)

  const html = `
  <html>
    <style>
      * {
        position: absolute
      }
    </style>
    <body>
${cardHtml}
    </body>
  </html>`

  //console.log(html)
  fs.writeFileSync('./card.html', html)
}

card()
