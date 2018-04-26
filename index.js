import { image } from './image'
import { capture } from './capture'
import { container } from './container'

async function card(){
  //let cap = new capture()

  let card = new container()
  { containerNode, imgNode } = card.addImage('Laboratory.bmp')
  imgNode.setCssProperty('border-radius', '10%')

  { textNode } = card.addText('This is some centered text dog')
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')
  //let testImage = new image('Laboratory.bmp')
  //testimage.setCssProperty('border-radius', '10%')

  //let imageHtml = await testImage.getHtml()
  //console.log(imageHtml)

  debugger
  cap.addHtml(imageHtml)

//  testImage = new image('./images/Laboratory.bmp')
//  testImage['borderRadius']('50%')
//  testImage['top']('200px')
//  imageHtml = await testImage.getHtml()
//  console.log(imageHtml)
//  cap.addHtml(imageHtml)
//
//  testImage = new image('./images/Laboratory.bmp')
//  testImage['borderRadius']('0%')
//  testImage['left']('200px')
//  imageHtml = await testImage.getHtml()
//  console.log(imageHtml)
//  cap.addHtml(imageHtml)
//
//  testImage = new image('./images/Laboratory.bmp')
//  testImage['borderRadius']('0%')
//  testImage['left']('200px')
//  testImage['top']('200px')
//  imageHtml = await testImage.getHtml()
//  console.log(imageHtml)
//  cap.addHtml(imageHtml)


  cap.capture()
}

card()
