import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import { execSync } from 'child_process'
import { createConnection } from 'typeorm'
import { Video } from './src/entity/Video'
import yargs from 'yargs'

const filePath = yargs.argv.file as string
let extension = yargs.argv.extension as string
// Assuming the extension name for now contains 3 chars like .mp4, .avi etc
if (!extension) {
  let ext = filePath.slice(-4).charAt(0) === '.' ? filePath.slice(-4): ''
  extension = ext.slice(ext.indexOf('.') + 1, ext.length)
}
let title = yargs.argv.title as string
if (!title) {
  title = filePath
    .slice(filePath.lastIndexOf('/') + 1 || 0, filePath.lastIndexOf('.'))
}
const fileName = title.replace(/(\s|\.)/gi, '-')

const targetPath = 'assets/videos/resized'
const readStream = fs.createReadStream(filePath)
const resolutions = {
  1080: { title: '1080P', dimensions: '1920x1080', quality: '1080' },
  720: { title: '720P', dimensions: '1280x720', quality: '720' },
  480: { title: '480P', dimensions: '858x480', quality: '480' },
  360: { title: '360P', dimensions: '480x360', quality: '360' },
  240: { title: '240P', dimensions: '352x240', quality: '240' },
}

const conversion = ffmpeg(readStream)
  .inputFormat(extension)

const addSizes = () => {
  Object.values(resolutions).forEach((r) => {
    conversion
      .size(r.dimensions)
      .save(`${fileName}.${r.title}.${extension}`)
  }) 
} 

function confirmDirectoryExists() {
  const exists = fs.existsSync(`./${targetPath}`)
  if (exists) return
  fs.mkdirSync(`./${targetPath}`, { recursive: true })
}

const addListeners = () => {
  conversion.on('progress', () => console.log(`⚙ Converting videos...`, ))
  .on('error', (err: any) => console.log('error: ', err))
  .on('end', () => {
    console.log('✅ Successfully converted video')
    const files = Object
      .values(resolutions)
      .map(r => `${fileName}.${r.title}.${extension}`)
    moveToFolder(files)
    updateDatabase(files)
  })
}

const moveToFolder = (files: string[]) => {
  // Since this is an isolate script, Its ok to use sync fns
  confirmDirectoryExists()
  execSync(`mv ${files.join(' ')} ./${targetPath}`)
  console.log('✅ Successfully moved')
}

const updateDatabase = (files: string[]): Promise<any> => {
  console.log('⚙ Writing to database...')
  return createConnection()
    .then(connection => {
      const video = new Video()
      video.title = title
      video.path = targetPath
      video.quality = Object.values(resolutions).map((r) => r.title)
      video.extension = extension
      const repo = connection.getRepository(Video)
      return repo.save(video)
    })
    .then(video => {
      console.log('✅ Record Saved')
      console.log(`You can watch this video at: http://localhost:3000/watch/${video.id}`)
      process.exit(0)
    })
    .catch((err) => console.error('error: ', err.message))
}

addSizes()
addListeners()
