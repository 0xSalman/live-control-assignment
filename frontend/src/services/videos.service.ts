import { BASE_URL } from '../constants'

export default class VideosService {
  static getVideosById(id: string) {
    return fetch(`${BASE_URL}/watch/${id}`)
      .then(res => res.json())
  }
}
