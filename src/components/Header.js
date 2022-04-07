import React from 'react'
import Button from './Button'

const Header = ({color, text, clickAddButton}) => {
  return (
    <header className=' header'>
      <h1>Task Tracker</h1>
      <Button color = {color} text = {text} clickAddButton = {clickAddButton}/>
    </header>
  )
}

export default Header
