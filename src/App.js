import React from 'react';
import './components/Header'
import Req from './components/Req';
import './App.css'

function App() {
  return (
    <div className="container">
      <Req/>
      
      <div className="box-initial">
        <h1 className="title">Get Started with Docker</h1>
              <h3 className="sub-title">We help developers and development teams build and ship apps.</h3>
              <a className='getbtn' href="#">Get Started</a>
      </div>

    </div>
  );
}

export default App;
