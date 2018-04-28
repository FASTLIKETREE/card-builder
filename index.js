import fs from 'fs'
import { container } from './container'

async function card(){
  let textNode 
  let card = new container()
  const { containerNode, imgNode } = card.addImage('Laboratory')
  console.log(containerNode + '<-- container node')
  console.log(typeof containerNode.addText + '<-- container node')
  imgNode.setCssProperty('border-radius', '10%')

  textNode = card.addText('This is some centered text neat!')
  textNode = textNode.textNode
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  textNode = containerNode.addText('Inner container node text WOOHO')
  textNode = textNode.textNode
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('width', '100%')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')
  textNode.setCssProperty('color', 'brown')

  debugger
  const cardHtml = card.getHtml(3)
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

  console.log(html)
  fs.writeFileSync('./card.html', html)
}

card()
