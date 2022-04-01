
import "./App.css";
//import { useEffect } from "react";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs } from "./actions/index";
//import { useDispatch } from "react-redux";
import{ Route, Routes} from 'react-router-dom';
import Home from './componets/Home.jsx'
import LandingPage from "./componets/landingPage.jsx";
//const { getTemperaments, getAllDogs } = require("./actions/index");


function App() {  
  
 
  return (
    <div className="App">
    <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>        
    </Routes>   
  </div>
 
   );
}

export default App;
