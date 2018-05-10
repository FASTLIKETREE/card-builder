import fs from 'fs'
import { container } from './container'
import { svg, mask, rect, circle, ellipse, polygon } from './svg'
import { frame } from './frame'
//import { genPage } from './genPage'

process.on('unhandledRejection', r => console.log(r));

function card(){
  let textNode 

  //const card = new frame(new polygon(4, 40, 60, 50, 22.5))
  //const card = new frame(new circle(80, 80, 20))
  const card = new frame(new ellipse(80, 80, 20, 10))
  //const card = new frame(new rect(0, 0, 400, 168))
  //const card = new frame(new rect(0, 0, 400, 168))

  //let imgNode = card.addImage('laboratory')
  //let treeImg = card.addImage('tree')
  //treeImg.setCssProperty('border-radius', '0%')
  //treeImg.setCssProperty('top', '40px')

  //textNode = treeImg.addText('This has a lot of power to wrap, you can write yourself a long card and things should be looking good. Love Wes')
  //textNode.setCssProperty('left', '50%')
  //textNode.setCssProperty('top', '50%')
  //textNode.setCssProperty('background', 'white')
  //textNode.setCssProperty('width', '140px')
  //textNode.setCssProperty('color', 'blue')
  //textNode.setCssProperty('font-size', '14px')
  //textNode.setCssProperty('text-align', 'center')
  //textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  //let starImg = treeImg.addImage('star')
  //starImg.setCssProperty('bottom', '30px')
  //starImg.setCssProperty('right', '55px')

  //textNode = starImg.addText('A')
  //textNode.setCssProperty('left', '50%')
  //textNode.setCssProperty('top', '50%')
  //textNode.setCssProperty('color', 'blue')
  //textNode.setCssProperty('font-size', '40px')
  //textNode.setCssProperty('text-align', 'center')
  //textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  //textNode = treeImg.addText('This has a lot of power to wrap, you can write yourself a long card and things should be looking good. Love Wes')

  card.save()
}

card()
