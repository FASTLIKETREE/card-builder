const percentPos = /^\d+\.?\d*%$/
const percentPosNeg =/^-?\d+\.?\d*%$/
const pixelPos = /^\d+\.?\d*px$/
const pixelPosNeg = /^-?\d+\.?\d*px$/
const color = /^#\d{6}$/

css = {
  img : {
    'border-radius' : [percentPos, pixelPos]
    'box-shadow' : {
        'h-offset': [pixelPos]
        'v-offset': [pixelPos]
        'blur': [pixelPos]
        'spread': [pixelPos]
        'color': [color],
        'inset': [/inset/],
      }
    'height',
    'border'
    'padding',
    'width'
  }


}

export { css }
