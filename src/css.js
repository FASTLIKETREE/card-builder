const percentPos = /^\d+\.?\d*%$/
const percentPosNeg = /^-?\d+\.?\d*%$/
const pixelPos = /^\d+\.?\d*px$/
const pixelPosNeg = /^-?\d+\.?\d*px$/
const color = /^#\d{6}$/

const css = {
  img: {
    'border-radius': [percentPos, pixelPos],
    'box-shadow': {
      'h-offset': [pixelPos],
      'v-offset': [pixelPos],
      'blur': [pixelPos],
      'spread': [pixelPos],
      'color': [color],
      'inset': ['inset']
    },
    'top': [percentPos, pixelPos],
    'left': [percentPos, pixelPos],
    'height': [percentPos, pixelPos],
    'width': [percentPos, pixelPos],
    'transform': [percentPosNeg, pixelPosNeg]
    //'border'
    //'padding',
  }
}

export { css }
