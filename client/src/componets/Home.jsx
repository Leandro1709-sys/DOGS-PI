import React from "react";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs } from "../actions/index";
import { Link } from "react-router-dom"
import Card from "./card";

export default  function Home (){
    
    //console.log(state);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getAllDogs());
    },[dispatch]);  
  
    const dogs = useSelector((state)=>state.dogsBreed);
    // function handleClick(e){
    //     e.preventDefault();
    //     dispatch(getAllDogs());
    // }
    console.log(dogs)
    return (
        
        <div>
             <Link to='/dogs'>Crear Raza</Link> 
            <h1>Find yor DOG!</h1>
            {/* <button onClick={(e)=>{handleClick(e)}}> Recargar Página </button> */}
            <div>
                <select>
                    {dogs.map((e)=>{
                        return <option value={e.temperament}>{e.temperament}</option>
                    })}
                </select>
                <select>
                    <option value='api'>Existentes</option>
                    <option value='created'>Creados</option>
                </select>
                <select>
                    <option value='asc'>ASC</option>
                    <option value='desc'>DES</option>
                </select>
                <select>
                    <option value='peso-asc'>ASC</option>
                    <option value='peso-des'>DES</option>
                </select>
            <div>
                {
                    dogs && dogs.map((e)=> {
                        return <Card name={e.name} weight={e.weight} temperament={e.temperament} image={e.imagen}/>
                    })
                }
            </div>
            </div>

        </div>
    )
}

