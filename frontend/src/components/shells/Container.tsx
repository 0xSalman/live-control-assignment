import React from 'react'
import './Container.css'

interface IProps {
  children: JSX.Element | JSX.Element[]
}

export default function Container(props: IProps) {
  const Children = props.children
  return <div data-component-id="lc-container">
    {Children}
  </div>
}