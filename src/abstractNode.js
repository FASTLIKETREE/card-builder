class node {
  constructor() {
    this.css = {}
  }

  setCssProperty(property, value) {
    this.css[property] = value
  }

  getPropertyString() {
    let propString = ''
    for (const key of Object.keys(this.css)) {
      propString += `${key}:${this.css[key]};`
    }
    return `"${propString}"`
  }
}

export { node }
