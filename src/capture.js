import childProcess from 'child_process'
import fs from 'fs'

//const execSync = childProcess.execSync
const execSync = childProcess.execFile

class capture {
  constructor(out) {
    this.htmlFile = 'capture.html'
    if (!out) {
      this.out = 'capture.bmp'
    }
    console.log(`${__dirname}\\${this.htmlFile}` + '<-- this is where wer write to?')
    fs.writeFileSync(`${__dirname}\\${this.htmlFile}`, '<html>\n<body style="margin:0px">\n')
  }

  getPath() {
    const encodedPath = `file:///${__dirname}/${this.htmlFile}`.replace(/\s+/g, '%20').replace(/\\/g, '/')
    console.log(encodedPath + '<-- this is the encoded path')
    return encodedPath
  }

  addHtml(html) {
    console.log(JSON.stringify(html, null, 4))
    fs.appendFileSync(`${__dirname}/${this.htmlFile}`, html + '\n')
  }

  capture() {
    fs.appendFileSync(`${__dirname}/${this.htmlFile}`, '</html>\n</body>')
    //Use chrome print screen function
  }
}

export { capture }
