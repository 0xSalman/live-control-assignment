import React from 'react'

interface IProps {
  filename: string
}
export default function VideoTitle(props: IProps) {
  return <h2>Video Title: {props.filename || 'Not Available'}</h2>
}