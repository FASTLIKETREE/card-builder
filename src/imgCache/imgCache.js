import imageSize from 'image-size'
import glob from 'glob'
import fs from 'fs'

const imgFolder = '../../img'

const imgCache = {}

glob(__dirname + '/' + imgFolder + '/*', async function(err, files) {
  const parr = []
  var sizedImages = 0

  for (const filePath of files) {
    imageSize(filePath, function(err, sizeData) {
      addCacheEntry(filePath, sizeData)
      sizedImages += 1
      if(sizedImages == files.length) {
        writeCache()
      }
    })
  }
})

function addCacheEntry(filePath, sizeData) {
  const sFileName = filePath.split('/')
  let fileName = sFileName[sFileName.length - 1]
  const nameExt = fileName.split('.')
  imgCache[nameExt[0]] = Object.assign({}, sizeData, { type: nameExt[1] })
}

function writeCache() {
  let cacheString = JSON.stringify(imgCache, null, 2)
  cacheString = cacheString.replace(/"/g, '\'')
  console.log(cacheString)

  fs.writeFileSync('./src/imgStats.js', 'const imgStats =\n')
  fs.appendFileSync('./src/imgStats.js', cacheString)
  fs.appendFileSync('./src/imgStats.js', '\n\nexport { imgStats }')
}
