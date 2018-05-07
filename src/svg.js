import { node } from './abstractNode'

class svg extends node {
  constructor() {
    super()
    this.svgNodes = []
    this.html = ''
    this.setCssProperty('width', '100%')
    this.setCssProperty('height', '100%')
  }

  addSvgNode(svgNode) {
    this.svgNodes.push(svgNode)
  }

  setMask(mask) {
    this.mask = mask
  }

  getMask() {
    return this.mask
  }

  getHtml(depth = 0) {
    const indentation = '  '.repeat(depth)
    const propertyString = this.getPropertyString()

    this.html += `${indentation}<svg style=${propertyString}>`

    if (this.mask) {
      this.html += `${this.mask.getHtml(depth + 1)}`
    }

    for (const svgNode of this.svgNodes) {
      this.html += `${indentation}  ${svgNode.getHtml()}\n`
    }

    this.html += `${indentation}</svg>\n`

    return this.html
  }
}

class maskableSvg extends node {
  constructor() {
    super()
    this.maskHtml = ''
  }

  setMaskId(maskId) {
    this.maskId = maskId
    this.maskHtml = `mask="url(#${this.maskId})"`
  }
}

class mask extends node {
  constructor(id) {
    super()
    if (!id) {
      throw new Error('id must be set when creating a mask')
    }
    this.id = id
    this.svgNodes = []
    this.html = ''
  }

  addSvgNode(svgNode) {
    this.svgNodes.push(svgNode)
  }

  getHtml(depth) {
    const indentation = '  '.repeat(depth)
    const propertyString = this.getPropertyString()

    this.html += `\n${indentation}<mask id='${this.id}' style=${propertyString}>\n`

    for (const svgNode of this.svgNodes) {
      this.html += `${indentation}  ${svgNode.getHtml()}\n`
    }

    this.html += `${indentation}</mask>\n`

    return this.html
  }
}

class rect extends maskableSvg {
  constructor(x, y, width, height) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }

  getHtml() {
    const propertyString = this.getPropertyString()
     return `<rect x='${this.x}' y='${this.y}' width='${this.width}' height='${this.height}' ${this.maskHtml} style=${propertyString}></rect>`
  }
}

class circle extends maskableSvg {
  constructor(x, y, r) {
    super()
    this.x = x
    this.y = y
    this.r = r
  }

  getBoundingBox() {
    return {
      x: this.x - this.r,
      y: this.y - this.r,
      width: 2 * this.r,
      height: 2 * this.r
      //top: this.y + this.r,
      //left: this.x - this.r,
      //bottom: this.y - this.r,
      //right: this.x + this.r
    }
  }

  getHtml() {
    const propertyString = this.getPropertyString()
    return `<circle x='${this.x}' y='${this.y}' r='${this.r}' ${this.maskHtml} style=${propertyString}></circle>`
  }
}

class ellipse extends maskableSvg {
  constructor(x, y, rx, ry) {
    super()
    this.x = x
    this.y = y
    this.rx = rx
    this.ry = ry
  }

  getBoundingBox() {
    return {
      x: this.x - rx,
      y: this.y - ry,
      width: 2 * rx,
      height: 2 * ry

      //top: this.y + this.ry,
      //left: this.x - this.rx,
      //bottom: this.y - this.ry,
      //right: this.x + this.rx
    }
  }

  getHtml() {
    const propertyString = this.getPropertyString()
    return `<ellipse x='${this.x}' y='${this.y}' rx='${this.rx}' ry='${this.ry}' ${this.maskHtml} style=${propertyString}></ellipse>`
  }
}

class polygon extends maskableSvg {
  constructor(sides, size, xPos, yPos, rotation) {
    super()
    this.pointArray = []
    this.sides = sides
    this.size = size
    this.xPos = xPos
    this.yPos = yPos

    let degrees = (rotation % 360)
    degrees = degrees < 0 ? 360 + degrees : degrees
    const rotationRadians = (2 * Math.PI) * (degrees / 360)

    for (let i = 0; i < sides; i += 1) {
      console.log('Below would be added to xPos')
      console.log(size * Math.cos((i * 2 * Math.PI / sides) + rotationRadians))
      let x = xPos + size + size * Math.cos((i * 2 * Math.PI / sides) + rotationRadians)
      //x = round(x, 3)
      x = round(x, 0)
      let y = yPos + size + size * Math.sin((i * 2 * Math.PI / sides) + rotationRadians)
      //y = round(y, 3)
      y = round(y, 0)
      this.pointArray.push({ x, y })
    }
    console.log('below is a point')
    console.log(this.pointArray)
    console.log('above is a point')
  }

  getBoundingBox() {
    let t, l, b, r
    for (const point of this.pointArray) {
      console.log(point)
      if (!l || !r) {
        l = point.x
        r = point.x
      }
      if (!t || !b) {
        t = point.y
        b = point.y
      }

      if (point.x < l) {
        l = point.x
      }
      if (point.x > r) {
        r = point.x
      }
      if (point.y < t) {
        t = point.y
      }
      if (point.y > b) {
        b = point.y
      }
    }
    console.log(this.pointArray)

    return {
      //top: t,
      //left: l,
      //bottom: b,
      //right: r
      x: l,
      y: t,
      width: r - l,
      height: b - t
    }
  }


  getHtml() {
    const propertyString = this.getPropertyString()
    let pointString = ''
    for (const point of this.pointArray) {
      pointString += `${point.x},${point.y} `
    }


    return `<polygon ${this.maskHtml} points='${pointString}'  ${this.maskHtml} style=${propertyString}></polygon>`
  }
}

function round(number, precision) {
  const shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision
    }
    const numArray = ('' + number).split('e')
    return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision))
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

export { svg, mask, rect, circle, ellipse, polygon }
