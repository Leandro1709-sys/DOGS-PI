import './search_bar.css' 
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getByName} from '../actions/index';

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name,setName]=useState('');
    
    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
      //  console.log(name)

    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name))
    }
    return(
        <div className='navigate'>
         
               <input type='text' placeholder="buscar razas..." onChange={(e)=>handleInput(e)} className='input'></input>
            
                <button type="submit" onClick={(e)=>handleSubmit(e)} className='botons'><span>buscar</span></button>
            
            
           
        </div>
    )


    }