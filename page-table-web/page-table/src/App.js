import BasePageTable from './BasePageTable'

import './App.css';
import {useState} from 'react';
import { getData } from './util/fetchData';
function App() {
  const [show, setShow] = useState(true);
  const startSearch = ()=>{
    getData("http://localhost:8081/pageTable/v1/getCount").then(res=>{
      console.log("res", res.data);
    })
  }
  return (
    <div className="App">
      <div className="pageTabe">
        <button onClick={()=>{setShow(!show)}}>change</button>
        <button onClick={startSearch}>start</button>
        {show ? <BasePageTable /> : ''}
      </div>
    </div>
  );
}

export default App;
