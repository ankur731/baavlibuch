import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from './components/Data';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Form />} />
      <Route path="/data" element={ <Data />} />
     
    </Routes>
    </BrowserRouter>
  )
}

export default App
