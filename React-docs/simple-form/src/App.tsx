import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState<string>('')
  const [formStatus, setFormStatus] = useState<string>('typing'); //submitting, typing, success
  const [error, setError] = useState<any>(null);

  if (formStatus === 'success') {
    return (
      <h1>You sabi Person!!!</h1>
    );
  }

  function handleTyping(e : any) {
    setAnswer(e.target.value);
  }

  async function handleSubmit(e : any) {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await submitForm(answer);
      setFormStatus('success');
    } catch (err) {
      setFormStatus('typing');
      setError(err)
    }
  }

  return (

    <>
      <h2>What is my name?</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          cols={30}
          rows={10}
          value={answer}
          onChange={handleTyping}
          disabled={formStatus === 'submitting'}  
        ></textarea>
        <br />
        
        <button disabled={answer.length === 0 || formStatus === 'submitting'}>
          Submit
        </button>

        {
          error !== null && 
          <p>{error.message}</p>
        }

      </form>
    </>
  )
}

function submitForm(response : string) {
  return new Promise((resolve : (value: void) => void, reject) => {
    setTimeout(() => {
      let shouldError = response.toLowerCase() !== 'twisted pen';

      if (shouldError) {
        reject(new Error('Na olodo you be. Oya try again!'));
      } else {resolve();}
    }, 2000);
  })
}

export default App
