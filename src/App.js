import './index.css'
import React from 'react';
import Start from './components/Start';
import Quizz from './components/Quizz';
import { nanoid } from 'nanoid';



function App() {

  const QUIZZ_STATES = {
    START:'START',
    QUIZZ_ON:'QUIZZ_ON',
    QUIZZ_CHECKED:'QUIZZ_CHECKED'
  }
  const BASEURL = 'https://opentdb.com/api.php?amount=5'
  const [quizzState, setQuizzState] = React.useState(QUIZZ_STATES.START)
  const [quizz, setQuizz] = React.useState([])
  const [counter ,setCounter] = React.useState(0)
  
  

  function startQuizz(category, difficulty){
    setQuizzState(QUIZZ_STATES.QUIZZ_ON)
    fetchQuestions(category, difficulty)
  }

  function urlParam(category, difficulty){
    const url = new URL(BASEURL)
    const params = url.searchParams
    params.set('category', category)
    params.set('diffyculty', difficulty)
    url.search = params.toString()
    const finalUrl = url.toString()
    console.log(finalUrl)
    return finalUrl
  }

  function fetchQuestions(category, difficulty){
    fetch(urlParam(category, difficulty))
    .then(res => res.json())
    .then(data => {
      const quizzEntireObject = data.results

      const quizz = quizzEntireObject.map((question)=> {
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random()*4)
        allAnswers.splice(randNum, 0 , question.correct_answer)
        
        const newAnswersArrayObject= allAnswers.map((answer, index) => {
          return {
            id:index,
            value:answer,
            isSelected: false,
            isChecked: false,
            isCorrect: false
          }
        })

        return {
          ...question,
          id: nanoid(),
          allAnswers:newAnswersArrayObject,
        }
      })
      setQuizz(quizz)
      console.log(quizz)
    }).catch(err => console.log(err))

  }

  // React.useEffect(() => {
  //   fetchQuestions()
  // }, [])

  function selectAnswer(e, questionId){
    const clickedValue = e.target.textContent
  
    setQuizz(oldQuizz => {
      return(oldQuizz.map( questionObj => {
        if(questionObj.id === questionId){
          return {...questionObj, 
            allAnswers: questionObj.allAnswers.map(answer => {
              if(answer.value === clickedValue){
                return { ...answer, isSelected:!answer.isSelected}
              } else {
                return {...answer, isSelected:false}
              }
            })}
        } else{
          return questionObj
        }
      }))

    })
  }

  function checkAnswer(){
    let counterPoint = 0

    const updateQuizz = quizz.map(questionObj => {
      let correct_answer = questionObj.correct_answer
      

      const updateAnswers = questionObj.allAnswers.map(answer => {
        if(answer.isSelected){
          if(answer.value === correct_answer){
            counterPoint = counterPoint + 1
            return {...answer,isChecked: true, isCorrect: !answer.isCorrect}
          } else{
            return {...answer, isChecked: true}
          }
        }
        else {
            if(answer.value === correct_answer){
              return {...answer,isChecked: true, isCorrect: !answer.isCorrect}
            } else{
             return {...answer, isChecked: true}
            }
        }
      })
      return {...questionObj, allAnswers: updateAnswers}
    })
    console.log(counter)

    setCounter(counterPoint)
    setQuizz(updateQuizz)
    setQuizzState(QUIZZ_STATES.QUIZZ_CHECKED)

  }

  function replay(){
    setQuizzState(QUIZZ_STATES.START)
    fetchQuestions()
  }

  function returnMenu(){
    setQuizzState(QUIZZ_STATES.START)
    fetchQuestions()
  }

  const questionElement = quizz.map(questionObj => {
    return (<Quizz questionObj={questionObj} selectAnswer={(e) => selectAnswer(e, questionObj.id)}/>)
  })

  const counterStyle = {
    color: "red"
  }

  return (
    <div className="app">
      {(() => {
        switch (quizzState) {
          case QUIZZ_STATES.START:
            return (<Start startQuizz={startQuizz}/>);

          case QUIZZ_STATES.QUIZZ_ON:
            return(<div className='quizz_container'>
              <button className='btn btn_return'onClick={returnMenu}>Return Menu</button>
              <div className='bg-images-container'>
                <div className='bg-img1'></div>
                <div className='bg-img2'></div>
              </div>
              {questionElement}
              <button className='btn btnCheck'onClick={checkAnswer}> Check Answers </button>
            </div>)

          default:
            return (<div>
            <div className='quizz_container'>
            <button className='btn btn_return'onClick={returnMenu}>Return Menu</button>
              <div className='bg-images-container'>
                <div className='bg-img1'></div>
                <div className='bg-img2'></div>
              </div>
              {questionElement}
              <div className='checkedSection'>
                <p className='score'>Your score is {counter}/5</p>
                <button className='btn'onClick={replay}> Replay </button>
              </div>
            </div>

            </div>);
        }
      })()}
    </div>
  );


  }

export default App;
