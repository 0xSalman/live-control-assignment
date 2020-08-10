import React from 'react'
import { Resolutions } from '../../constants'
import './QualityPicker.css'

interface IProps {
  qualities: string[]
  quality: number
  pickQuality: any
}

export default function VideoElement(props: IProps) {
  const onQualityChange = (e: any) => {
    const quality = Number(e.target.value)
    props.pickQuality(quality)
  }
  const qualities = props.qualities
  return <select 
    value={props.quality}
    onChange={onQualityChange}
    data-component-id="lc-picker">
    {qualities.map(q => <option 
        key={q}
        value={Resolutions[Number(q.replace('P', ''))].quality}>
        {Resolutions[Number(q.replace('P', ''))].title}
      </option>
    )}
  </select>
}