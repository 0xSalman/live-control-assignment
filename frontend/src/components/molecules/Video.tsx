import React from 'react'

import VideoTitle from '../atoms/VideoTitle'
import VideoElement from '../atoms/VideoElement'
import QualityPicker from '../atoms/QualityPicker'
import VideosService from '../../services/videos.service'

interface VideoDataState {
  id: number,
  path: string,
  title: string,
  extension: string,
  quality: string[]
}

export default function Video() {
  const [videoData, setVideoData] = React.useState<VideoDataState>({
    id: 0,
    path: '',
    title: '',
    extension: '',
    quality: []
  })
  const [quality, pickQuality] = React.useState(480)

  React.useEffect(() => {
    // Usually these params come from route-params, react and HTML specs provide this.
    // for now splitting the name from route 🤔
    // Make sure you always pass /watch/:filename to make it work, 
    const name = window.location.pathname.split('/')[2]
    if (!name) {
      return;
    }

    VideosService.getVideosById(name)
      .then(data => setVideoData(data))
  }, [quality])
  
  return <React.Fragment>
    <VideoTitle filename={videoData.title}/>
    <VideoElement
      id={videoData.id}
      path={videoData.path}
      filename={videoData.title}
      extension={videoData.extension}
      pickedQuality={quality}
      />
    <QualityPicker qualities={videoData.quality} quality={quality} pickQuality={pickQuality} />
  </React.Fragment>
}
