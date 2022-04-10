
import "./App.css";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs } from "./actions/index";
//import { useDispatch } from "react-redux";
import{ Route, Routes, useParams} from 'react-router-dom';
import Home from './componets/Home.jsx'
import LandingPage from "./componets/landingPage.jsx";
import CreateDog from "./componets/create-dog";
import Detail from "./componets/detail";
//const { getTemperaments, getAllDogs } = require("./actions/index");


function App() {  
  
  return (
    <div className="App">
    <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/Home" element={<Home/>}/>   
        <Route path="/DogCreate" element={<CreateDog/>}/>
        <Route path="/Detail/:id" element={<Detail/>}/> 
           
    </Routes>   
  </div>
 
   );
}

export default App;
