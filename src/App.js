import './App.css';
import './bootstrap.min.css'
import {react, useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import Home from './pages/Home';


function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
