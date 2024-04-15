import { useEffect, useReducer } from 'react';
import './App.css'
import Header from './Header';
import Loader from './Loader';
import Error from './Error';

const initialState = {
  questions: [],
  status: 'loading', //loading, ready, finished, error, active
  index: 0,
  answer: null,
  points: 0,
}

function reducer (state, action) {
  switch (action.type) {
    case "dataFetched" :
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    
    case "failed" :
      return {
        ...state,
        status: 'error'
      };

    case "active" :
      return {
        ...state,
        status: 'active'
      };

    case "finished" :
      return {
        ...state,
        status: 'finished'
      };

    case "newAnswer" :
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: 
          action.payload === question.correctOption ?
          state.points + question.points :
          state.points,
      };

    case "nextQuestion" :
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }

    default : 
      throw new Error ('Action unknown!');

  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {questions, status, index, answer, points} = state;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
    .then(res => res.json())
    .then(data => dispatch({type: 'dataFetched', payload: data}))
    .catch(err => dispatch({type: 'failed'}))
  }, [])

  const numQuestion = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);


  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestion={numQuestion} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestion={numQuestion}
            />

          </>
        }
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

function Progress({index, numQuestion, points, maxPoints, answer}) {
  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={numQuestion} />
      <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>
      <p><strong>{points}</strong> / {maxPoints} points</p>
    </header>
  );
}



function NextButton({dispatch, answer, index, numQuestion}) {
  if (answer === null) return;

  if (index < numQuestion - 1) {
    function handleNext() {
      dispatch({type: 'nextQuestion'});
    }

    return (
      <button className='btn btn-ui' onClick={handleNext}>Next</button>
    );
  }

  if (index === numQuestion -1 ) {
    function finish() {
      dispatch({type: 'finished'});
    }
  
    return (
      <button className='btn btn-ui' onClick={finish}>Finish</button>
    );
  }
}


function Question({question, dispatch, answer}) {

  return (
    <div>
      <h4>{question.question}</h4>
  
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}  
      />
    </div>
  );
}


function Options({question, dispatch, answer}) {
  const isAnswered = answer !== null;

  return (
    <div>
      {question.options?.map((option, index) =>
        <button
          className={`btn btn-option ${index === answer ? answer : ""}
            ${isAnswered ?
              index === question.correctOption ? "correct" : "wrong"
              : ""
            }`}
          key={option}
          disabled={isAnswered}
          onClick={() => dispatch({type: 'newAnswer', payload: index})}
        
        >{option}</button>)}
    </div>
  );
}


function StartScreen({numQuestion, dispatch}) {
  return (
    <div>
      <h2>Welcome to the React Quiz</h2>
      <h4>{numQuestion} questions to test your React mastery</h4>

      <button className='btn btn-ui' onClick={() => dispatch({type: 'active'})}>Let's start</button>
    </div>
  );
}


function Main({children}) {
  return (
    children
  );
};


function FinishScreen({points, maxPoints}) {
  const percentage = Math.ceil((points / maxPoints) * 100)
  return (
    <p>
      You scored <strong>{points}</strong> out of {maxPoints}
      {percentage}%
    </p>
  );
}

export default App
