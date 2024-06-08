import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';

function App() {
  const [page, setPage] = useState();

  const array = ["page 1", "page 2", "page 3", "page 4", "page 5"];
  
  function handlePage(index) {
    setPage(index)
  }

  useEffect(() => {
    if (page) document.title = page;
    return () => {
      console.log('Changing page from', page)
    }
  }, [page])


  return(
    <div>
      {
        array?.map((item, i) => 
        <button
          value={page}
          key={i + 1}
          onClick={() => handlePage(i+1)}>
            Page {i + 1}
        </button>)
      }
      {/* <button>Page 1</button>
      <button>Page 2</button>
      <button>Page 3</button>
      <button>Page 4</button>
      <button>Page 5</button> */}
    </div>
  );
}

export default App
