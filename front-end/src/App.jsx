

import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [data,setData] = useState([]);
  const [query,setQuery] = useState();
  const [value,setValue] = useState('youtube');

  async function handleClick(e){
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/search',{query,value});
   
    console.log(res.data);
    setData(res.data);
  }

  function handleChange(e){
    const input = e.target.value;
    setQuery(input)
  }
  function handleSelect(e){
    const input = e.target.value;
    console.log(input);
    setValue(input);
  }
  return (
  <>

      <form onSubmit={handleClick}>
   
      <input type='text' name='searchQuery' onChange={handleChange} required={true} />
      <select onChange={handleSelect} >
        <option>youtube</option>
        <option>blog</option>
        <option>research</option>
      </select>
      <button type='submit'>Search</button>

      {(data.length>0)?<div>
      {
        data.map((item)=>(
          <div>
            <h4>{item.title}</h4>
            <a href={item.url}>Check it!</a>
          </div>
        ))
      }
      </div>:
      <div>
        Welcome to the Page
      </div>}
      </form>
    
  </>
  )
}

export default App
