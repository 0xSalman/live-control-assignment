import fs from 'fs'
import { Router } from 'express'
import { Repository, getRepository } from 'typeorm'
import { Video } from '../entity/Video'

const router = Router()

// TODO All of this should be in repository layer
// * Since we have max 1 or 2 routes we are keeping everything together

let videoRepository: Repository<Video>
function getVideoRepository(): Repository<Video> {
  if (videoRepository) return videoRepository
  videoRepository = getRepository(Video)
  return videoRepository
}

const readVideoById = (id: number): Promise<Video> => {
  return getVideoRepository()
    .findOne({where: {id}})
}

router.get(`/watch/:id`, function(request, response) {
  const id = parseInt(request.params.id)
  readVideoById(id)
    .then(video => void response.status(200).send(video))
})

router.get('/watch/:id/file', (request, response) => {
  const id = parseInt(request.params.id)
  const { quality } = request.query
  readVideoById(id)
    .then(video => {
      // TODO directory paths should be in constant file
      const root = __dirname + '../../../'
      const fn = video.title.replace(/(\s|\.)/gi, '-')
      const filePath = `${video.path}/${fn}.${quality}.${video.extension}`
      // TODO this has memory optimization issues
      response.sendFile(filePath, {root})
    })
})

export { router }
