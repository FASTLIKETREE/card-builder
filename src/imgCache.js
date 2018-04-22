import imageSize from 'image-size'
import glob from 'glob'
import fs from 'fs'
import { promisify } from 'util'

const sizeOf = promisify(imageSize);

const imgCache = {}

glob(__dirname + '/../build/images/*', async function(err, files) {
  const parr = []

  for (const file of files) {
    console.log(file)
    parr.push(sizeOf(file))
    let test = await sizeOf(file)
    console.log(test)
  }

  const parr2= await Promise.all(parr)

  console.log(JSON.stringify(parr, null, 4))
  console.log(JSON.stringify(parr2, null, 4))


  for (const [index, stats] of parr.entries()) {
    imgCache[files[index]] = stats
  }

  console.log(JSON.stringify(imgCache, null, 4))

  console.log('WE ARE ABOUT TO WRITE SOME SHIT?')

  fs.writeFileSync(`${__dirname}/imgStats.js`, 'const imgStats =\n')
  fs.appendFileSync(`${__dirname}/imgStats.js`, JSON.stringify(imgCache, null, 4))
  fs.appendFileSync(`${__dirname}/imgStats.js`,'export { imgStats }')
})

export { imgCache }
