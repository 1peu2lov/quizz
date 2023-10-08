import React from 'react'
import Answer from './Answer'
import '../index.css'
import { decode } from 'html-entities'

const Quizz = ({questionObj,selectAnswer, ...rest}) => {

    const answers = questionObj.allAnswers.map( (answerObj) => {
        return (<Answer answerObj={answerObj} selectAnswer={selectAnswer}/> )
    })

  return (
    <div className='question_style'>
        <h2>{decode(questionObj.question)}</h2>
        <div className='answers_style'>{answers}</div>
    </div>
  )
}

export default Quizz