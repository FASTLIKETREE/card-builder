import imageSize from 'image-size'
import glob from 'glob'
import fs from 'fs'
import { promisify } from 'util'

const imgFolder = '../../img'
const sizeOf = promisify(imageSize)

const imgCache = {}

glob(__dirname + '/' + imgFolder + '/*', async function(err, files) {
  const parr = []

  for (const file of files) {
    parr.push(sizeOf(file))
  }

  const resolvedParr = await Promise.all(parr)

  for (const [index, stats] of resolvedParr.entries()) {
    const sFileName = files[index].split('/')
    let fileName = sFileName[sFileName.length - 1]
    const nameExt = fileName.split('.')
    stats.type = nameExt[1]
    imgCache[nameExt[0]] = stats
  }
  let imgCacheJSON = JSON.stringify(imgCache, null, 2)
  imgCacheJSON = imgCacheJSON.replace(/"/g, '\'')

  fs.writeFileSync('./src/imgStats.js', 'const imgStats =\n')
  fs.appendFileSync('./src/imgStats.js', imgCacheJSON)
  fs.appendFileSync('./src/imgStats.js', '\n\nexport { imgStats }')
})
