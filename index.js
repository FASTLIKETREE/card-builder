import { image } from './image'
import { capture } from './capture'

const testImage = new image('./images/Laboratory.bmp')
testImage['borderRadius']('50%')
const imageHtml = testImage.getHtml()
console.log(imageHtml)

const cap = new capture()
cap.addHtml(imageHtml)
cap.capture()
