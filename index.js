//import { image } from './image'
//import { capture } from './capture'
import fs from 'fs'
import { container } from './container'

async function card(){
  //let cap = new capture()


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

  textNode = containerNode.addText('Inner container node text')
  textNode = textNode.textNode
  textNode.setCssProperty('left', '50%')
  textNode.setCssProperty('top', '50%')
  textNode.setCssProperty('transform', 'translateX(-50%) translateY(-50%)')
  textNode.setCssProperty('color', 'white')

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


  //let testImage = new image('Laboratory.bmp')
  //testimage.setCssProperty('border-radius', '10%')

  //let imageHtml = await testImage.getHtml()
  //console.log(imageHtml)

  //cap.addHtml(imageHtml)

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


//  cap.capture()
}

card()
