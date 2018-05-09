import fs from 'fs'

class genPage {
  constructor() {
    this.boundingString = ''
    this.insertHtml = ''
  }

  addHtml(html) {
    this.insertHtml += html
  }

  setBoundingBox(boundingBox) {
    const boundingBoxArray = Object.values(boundingBox)
    //var args = Array.prototype.slice.call(arguments)
    console.log('BELOW ARE THE ARGS FOR SET BOUNDING BOX!')
    console.log(boundingBoxArray)
    this.boundingString = `<!-- ${boundingBoxArray.join(', ')} -->`
  }

  genPage() {
    let insertText = ''
    for (let i = 0; i < arguments.length; i++) {
      insertText += arguments[i]
    }
const html = `${this.boundingString}
<html>
  <style>
    * {
      position: absolute
    }
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  </style>
  <script>
    document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    document.title = "X is "+x+" and Y is "+y;
    }
  </script>
  <body>
    ${this.insertHtml}
  </body>
</html>`
    fs.writeFileSync('./card.html', html)
  }
}

export  { genPage }
