const validatePixelInput = /\d+[.]?\d*px/
const validatePercentageInput = /\d+[.]?\d*%/

class image {
  constructor(src){
    this.src = src
    this.cssObject = {
      position: 'absolute'
    }
  }

  validateSizeInput(input) {
    if(!(this.pixelInputValid(input) || this.percentageInputValid(input))) {
      throw new Error(`Input ${input} was not a valid pixel or percentage input`)
    }
  }

  pixelInputValid(input){
    return (input.match(validatePixelInput) == null)
  }

  percentageInputValid(input) {
    return (input.match(validatePixelInput) == null)
  }

  validateRangeInput(low, high, input) {
    if (typeof low != number) {
      throw new Error(`Low bound range validator must be a number`)
    }

    if (typeof high != number) {
      throw new Error(`High bound range validator must be a number`)
    }


    if (typeof input != number) {
      throw new Error(`Input must be a number type`)
    }

    if (low > high) {
      throw new Error(`High bound range validator must be higher than low`)
    }

    if (input < low || input > high) {
      throw new Error(`Input: ${input} out of range`)
    }
  }

  //border-radius
  borderRadius(radius) {
    this.validateSizeInput(radius)
    this.cssObject['border-radius'] = radius
  }

  opacity(opacity) {
    validateRangeInput(0, 1, opacity)
    this.cssObject['opacity'] = opacity
  }

  getHtml() {
    let css = ''
    for (const key in this.cssObject) {
      css += `${key}:${this.cssObject[key]};`
    }
    return `<img src="${this.src}" style="${css}"></img>`
  }
}

export { image }
