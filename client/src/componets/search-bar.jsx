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
        console.log(name)

    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name))

    }
    return(
        <div>
            <input type='text' placeholder="buscar" onChange={(e)=>{handleInput(e)}}></input>
            <button type="submit" onClick={(e)=>{handleSubmit(e)}}>BUSCAR</button>
        </div>
    )


    }