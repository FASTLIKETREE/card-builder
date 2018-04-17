import childProcess from 'child_process'
import fs from 'fs'

//const execSync = childProcess.execSync
const execSync = childProcess.execFile
const IECapt = '../bin/IECapt.exe'

class capture {
  constructor(out) {
    this.htmlFile = 'captured.html'
    if (!out) {
      this.out = 'capture.bmp'
    }
  }

  getPath() {
    const encodedPath = `file:///${__dirname}/${this.htmlFile}`.replace(/\s+/g, '%20').replace(/\\/g, '/')
    console.log(encodedPath + '<-- this is the encoded path')
    return encodedPath
  }

  addHtml(html) {
    fs.appendFileSync(`${__dirname}/${this.htmlFile}`, html)
  }

  capture() {
    const encodedPath = this.getPath()
    console.log(`${IECapt} --url="${encodedPath}" --out="${this.out}"`)
    execSync(`${IECapt} --url="${encodedPath}" --out="${this.out}"`)
  }
}

export { capture }
