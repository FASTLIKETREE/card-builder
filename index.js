import fs from 'fs'
import { container } from './container'
import { svg, mask, rect, polygon } from './svg'
import { frame } from './frame'
import { genPage } from './genPage'

process.on('unhandledRejection', r => console.log(r));

function card(){
  //const imgFrame = new frame(new polygon(8, 40, 60, 50, 22.5))
  const imgFrame = new frame(new rect(0, 0, 300, 168))

  let textNode 
  let card = new container()
  //let imgNode = card.addImage('laboratory')
  let imgNode = card.addImage('tree')
  imgNode.setCssProperty('border-radius', '40%')
  //let monkey = card.addImage('monkey')
  //monkey.setCssProperty('width', '25%')
  //monkey.setCssProperty('height', '25%')
  //monkey.setCssProperty('left', '80px')
  //monkey.setCssProperty('top', '50px')
  //let monkeyContainer = monkey.getContainerNode()
  //monkeyContainer = monkeyContainer.addText('Monkey')
  //monkeyContainer.setCssProperty('left', '50%')
  //monkeyContainer.setCssProperty('top', '50%')
  //monkeyContainer.setCssProperty('color', 'green')
  //monkeyContainer.setCssProperty('font-size', '10px')
  //monkeyContainer.setCssProperty('text-align', 'center')
  //monkeyContainer.setCssProperty('transform', 'translateX(-50%) translateY(0%)')




  let containerNode = imgNode.getContainerNode()
  imgNode = containerNode.addImage('star')
  let container1 = imgNode.getContainerNode()

  container1.setCssProperty('bottom', '30px')
  container1.setCssProperty('right', '55px')

  //imgNode = containerNode.addImage('star')
  //container1 = imgNode.getContainerNode()

  //container1.setCssProperty('bottom', '10px')
  //container1.setCssProperty('left', '10px')

  textNode = container1.addText('A')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('color', 'blue')
  textNode.setCssProperty('font-size', '40px')
  textNode.setCssProperty('text-align', 'center')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  //textNode = containerNode.addText('Inner container node text WOOHO')
  //textNode.setCssProperty('left', '50%')
  //textNode.setCssProperty('top', '60%')
  //textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')
  //textNode.setCssProperty('color', 'pink')

  textNode = containerNode.addText('This has a lot of power to wrap, you can write yourself a long card and things should be looking good. Love Wes')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('background', 'white')
  textNode.setCssProperty('width', '140px')
  
  textNode.setCssProperty('color', 'blue')
  textNode.setCssProperty('font-size', '14px')
  textNode.setCssProperty('text-align', 'center')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  //Page generator starts here
  const pageGenerator = new genPage()
  pageGenerator.addHtml(card.getHtml())
  pageGenerator.addHtml(imgFrame.getHtml())
  console.log('below is the imgFrame bounding box')
  console.log(imgFrame.getBoundingBox())
  pageGenerator.setBoundingBox(imgFrame.getBoundingBox())
  pageGenerator.genPage()
}

card()
