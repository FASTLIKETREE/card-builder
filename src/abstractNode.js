class node {
  constructor() {
    this.css = {}
  }

  setId(id) {
    this.id = id
  }

  setCssProperty(property, value) {
    this.css[property] = value
  }

  getCssProperty(property) {
    return this.css[property]
  }

  getPropertyString() {
    let idString = ''
    if (this.id) {
      idString = `id="${this.id}" `
    }
    let propString = ''
    for (const key of Object.keys(this.css)) {
      propString += `${key}:${this.css[key]};`
    }
    return `${idString}"${propString}"`
  }
}

export { node }
