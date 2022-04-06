import React from "react";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs, getAllTemps, filterByTemp,filterCreated,orderByName,orderByW } from "../actions/index";
import { Link } from "react-router-dom"
import Card from "./card";
import Paginado from './paginado';
import SearchBar from "./search-bar";

export default  function Home (){
    
    //console.log(state);
    const dispatch = useDispatch();
    const temeperaments = useSelector((state)=>state.allTemps);
    const dogs = useSelector((state)=>state.dogsBreed);
    const [orden,setOrden] = useState('')
     
    //console.log('length',dogs.length);
    const[currentPage,setCurrentPage]=useState(1);
    const[dogsxPage,setDogsxPage]=useState(8);
    const indexOfLastDog= currentPage * dogsxPage;
    const indexOfFirstDog=indexOfLastDog-dogsxPage;
    const currentDog = dogs.slice(indexOfFirstDog,indexOfLastDog);

    //console.log(currentDog)
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getAllTemps());},[dispatch]);
    
     useEffect(()=>{
      dispatch(getAllDogs());},[dispatch]);    
  
  
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllDogs());
        setCurrentPage(1);
    }
    
    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1);
    }
    function handleCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
       
    }
    function handleOrderBy(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleByWeigth(e){
        e.preventDefault();
        dispatch(orderByW(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    //console.log(dogs)

   // console.log('temps',temeperaments);
    return (
        
        <div>
             <Link to='/dogs'>Crear Raza</Link> 
            <h1>Find yor DOG!</h1>
            <button onClick={(e)=>{handleClick(e)}}> Recargar Página </button> 
            <SearchBar/>
            <div>
               temperamentos: <select onChange={(e)=>{handleFilterTemp(e);}}>
                <option value='All'>Todos...</option>
                    {temeperaments.map(e=>{
                        return <option value={e.name}>{e.name}</option>
                    })}
                </select>
                creados: <select onChange={(e)=>{handleCreated(e);}}>
                    <option value='All'>Todos</option>
                    <option value='Api'>Existentes</option>
                    <option value='Created'>Creados</option>
                </select>
            orden: <select onChange={(e)=>{handleOrderBy(e);}}>
                    <option value='asc'>ASC</option>
                    <option value='desc'>DES</option>
                </select>
               por peso:  <select onChange={(e)=>{handleByWeigth(e);}}>
                    <option value='peso-asc'>ASC</option>
                    <option value='peso-des'>DES</option>
                </select>
               <div className="cardcontainer">
                <Paginado dogsxPage={dogsxPage} dogs={dogs.length} paginado={paginado}/>
                </div>
               <div>
              
                { console.log(currentDog)}
                    {currentDog && currentDog.map((e)=> {
                        return <Card name={e.name} weight={e.weight} temperament={e.temperament?e.temperament:e.temperaments} image={e.imagen}/>
                    })
                }
            </div>
            </div>

        </div>
    )
    
}

