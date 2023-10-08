import React from 'react'
import Option from './Option'
import '../index.css'

const Start = (props) => {
  return (
    <div className='startPage__container'>
        <div className='bg-images-container'>
          <div className='bg-img1'></div>
          <div className='bg-img2'></div>
        </div>
        <div className='start__container'>
            <h1 className='title'>Quizzical</h1>
            <p className='description'>A fun way to increase your knowledge</p>
            <Option startQuizz={props.startQuizz}></Option>
        </div>
    </div>
  )
}

export default Start