import React from 'react'
import '../index.css'
import { decode } from 'html-entities'

const Answer = ({answerObj, selectAnswer}) => {

    const {isSelected, isChecked, isCorrect} = answerObj

    const backgroudColor = () => {
        if(isSelected){
            if(isCorrect){
                return "#94D7A2"  // green
            } else if(!isCorrect && isChecked){
                return "#F8BCBC" // Red
            } else {
                return "#D6DBF5" // blue
            }
        } 
        else if (!isSelected && isCorrect){
            return "#94D7A2" // green
        }
    }

    const answerStyles = {
        backgroundColor: backgroudColor(),
        opacity: (isChecked && !isCorrect) ? "0.5" : "1",
        border: (isSelected || isCorrect) ? "none" : "1px solid #293264",
    }


  return (
    <div className='answers_container' onClick={(e) => selectAnswer(e)} >
        <p className='answer_style' style={answerStyles}>{decode(answerObj.value)}</p>
    </div>
  )
}

export default Answer