import imageSize from 'image-size'
import glob from 'glob'
import fs from 'fs'
import { promisify } from 'util'

const imgFolder = '../../img'
const sizeOf = promisify(imageSize);

const imgCache = {}

glob(__dirname + '/' + imgFolder +'/*', async function(err, files) {
  const parr = []

  for (const file of files) {
    parr.push(sizeOf(file))
    let test = await sizeOf(file)
    console.log(test)
  }

  const resolvedParr = await Promise.all(parr)
  console.log(resolvedParr)

  for (const [index, stats] of resolvedParr.entries()) {
    const sFileName = files[index].split('/')
    const fileName = sFileName[sFileName.length - 1]
    imgCache[fileName] = stats
  }
  console.log(imgCache)

  fs.writeFileSync(`./src/imgStats.js`, 'const imgStats =\n')

  fs.appendFileSync(`./src/imgStats.js`, JSON.stringify(imgCache, null, 4))
  fs.appendFileSync(`./src/imgStats.js`,'\n\nexport { imgStats }')
})
