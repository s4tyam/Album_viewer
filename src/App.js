import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import Main from './Components/Main'
function App() {
  return (
    <div >
    {/*
    exact is used to match the exact path for preventing the rendering of the other components*/}
    <Route path= "/" component ={HomePage} exact/>
    <Route path= "/search" component={Main} />
    </div>
  )
}

export default App
