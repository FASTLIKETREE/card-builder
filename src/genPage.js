import fs from 'fs'

function genPage() {
  let insertText = ''
  for (let i = 0; i < arguments.length; i++) {
    insertText += arguments[i]
  }
const html = `
  <html>
    <style>
      * {
        position: absolute
      }
      html, body {
        width: 100%;
        height: 100%;
      }
    </style>
    <body>
${insertText}
    </body>
  </html>`

  fs.writeFileSync('./card.html', html)
}

export  { genPage }
