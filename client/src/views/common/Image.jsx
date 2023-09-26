import React from 'react'

const Image = ({ image }) => {
  return (
    <div className='app-img'>
      <img src={image} alt="" />
    </div>
  )
}

export default Image
