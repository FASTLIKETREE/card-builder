import fs from 'fs'
import { container } from './container'
import { svg, mask, rect, circle, ellipse, polygon, boundedPolygon } from './svg'
import { frame } from './frame'

process.on('unhandledRejection', r => console.log(r));

function card(){
  let textNode 

  //const card = new frame(new polygon(3, 150, 60, 90, 30))
  //const card = new frame(new circle(80, 80, 20))
  //const card = new frame(new ellipse(80, 80, 100, 100))
  //const card = new frame(new rect(0, 0, 400, 168))
  //const card = new frame(new rect(0, 0, 400, 168))

  //const card = new frame(new boundedPolygon(100, 100, 256, 256, 6, 30))
  const card = new frame(new boundedPolygon(0, 0, 256, 256, 6, 30))

  let bowmanImg = card.addImage('bowman')
  let paperImg = card.addImage('paper')

  bowmanImg.centerImagePoint(462, 111, 0, 0, 1, .5)
  paperImg.centerImagePoint(150, 100, 0, 1, 1, .5)

  //let treeImg = card.addImage('tree')
  //imgNode.setCssProperty('border-radius', '50%')
  //treeImg.setCssProperty('left', '50%')
  //treeImg.setCssProperty('top', '80px')
  //treeImg.setCssProperty('bottom', '-50%')
  //imgNode.setCssProperty('bottom', '-50%')

  //textNode = bowmanImg.addText('This has a lot of power to wrap text')
  textNode = paperImg.addText('This has a lot of power to wrap text you see')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '40%')
  //textNode.setCssProperty('left', '16px')
  //textNode.setCssProperty('right', '16px')
  textNode.setCssProperty('width', 160)
  textNode.setCssProperty('color', 'blue')
  textNode.setCssProperty('font-size', '16px')
  textNode.setCssProperty('text-align', 'center')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')

  //let imgNode = card.addImage('laboratory')

  let swordImg = bowmanImg.addImage('sword')
  swordImg.setCssProperty('bottom', 0)
  swordImg.setCssProperty('right', 16)

  let shieldImg = bowmanImg.addImage('shield')
  shieldImg.setCssProperty('bottom', 0)
  shieldImg.setCssProperty('left', 16)

  swordImg.setAnchorPoint('attack', .5, .5)
  swordImg.setAnchorPoint('health', 0, .5)
  shieldImg.setAnchorPoint('defense', .5, .5)

  card.save('bowman')
}

card()
