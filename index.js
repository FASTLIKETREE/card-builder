import fs from 'fs'
import { container } from './container'
import { svg, mask, rect, polygon } from './svg'
import { frame } from './frame'
import { genPage } from './genPage'

process.on('unhandledRejection', r => console.log(r));

function card(){
  const imgFrame = new frame(new polygon(8, 120, 150, 200, 22.5))

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

  genPage(card.getHtml(), imgFrame.getHtml())
}

card()
