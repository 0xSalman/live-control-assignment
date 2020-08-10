import React from 'react'

import './VideoElement.css'
import { Resolutions, BASE_URL } from '../../constants'
import {  } from '../../services/videos.service'

interface IProps {
  id: number;
  path: string;
  filename: string;
  extension: string;
  pickedQuality: number;
}

// TODO this fn should be in utils
function getQuery(data: IProps) {
  const { title: q } = Resolutions[data.pickedQuality]
  return `?quality=${q}`
}

function getVideoURI(props: IProps) {
  if (!props.filename || !props.extension) return ''
  return `${BASE_URL}/watch/${props.id}/file${getQuery(props)}`
}

export default function VideoElement(props: IProps) {
  return <video
    data-component-id="lc-video-elem"
    height="600"
    src={getVideoURI(props)} 
    controls
  >
  </video>
}
