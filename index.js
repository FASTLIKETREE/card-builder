import { image } from './image'
import { capture } from './capture'

async function card(){
  let cap = new capture()

  let testImage = new image('./images/Laboratory.bmp')
  testImage['borderRadius']('10%')
  let imageHtml = await testImage.getHtml()
  console.log(imageHtml)
  cap.addHtml(imageHtml)

  testImage = new image('./images/Laboratory.bmp')
  testImage['borderRadius']('50%')
  testImage['top']('200px')
  imageHtml = await testImage.getHtml()
  console.log(imageHtml)
  cap.addHtml(imageHtml)

  testImage = new image('./images/Laboratory.bmp')
  testImage['borderRadius']('0%')
  testImage['left']('200px')
  imageHtml = await testImage.getHtml()
  console.log(imageHtml)
  cap.addHtml(imageHtml)

  testImage = new image('./images/Laboratory.bmp')
  testImage['borderRadius']('0%')
  testImage['left']('200px')
  testImage['top']('200px')
  imageHtml = await testImage.getHtml()
  console.log(imageHtml)
  cap.addHtml(imageHtml)


  cap.capture()
}

card()
