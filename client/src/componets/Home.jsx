import './home.css'
import React from "react";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAllDogs, getAllTemps, filterByTemp,filterCreated,orderByName,orderByW } from "../actions/index";
import { Link } from "react-router-dom"
import Dog from '../images/yellou.png'
import Gif from '../images/search.gif'
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
        
        <div className='container'>
            {typeof dogs != 'objet'?<>
            <div className='nav'>
                <div className="logo">
                    <a className='link' onClick={(e)=>handleClick(e)}>
                    <img src={Dog} className='img_logo'></img>
                    <h1>Find yor DOG!</h1>
                    </a>
                </div>
                <div className="container_2">
                    <div className="crea_busca">
                        <div className='crear' >
                        <Link to='/DogCreate'><button className='botonsCrea'><span>CREA UNA NUEVA RAZA!</span></button></Link> 
                        </div>
                        <div className='search'>
                        <SearchBar/>
                        </div>
                    </div>
                <div className="filtrado">
                  
                        <div className="box">
                        <h1>Temperamentos: </h1> <select onChange={(e)=>{handleFilterTemp(e);}}  className='option'>
                            <option value='All'>Todos...</option>
                            {temeperaments.map(e=>{
                                return <option value={e.name}>{e.name}</option>
                            })}
                        </select>
                        </div>
                        <div className="box">
                        <h1>Creados/existentes:</h1><select onChange={(e)=>{handleCreated(e);}} className='option'>
                            <option value='All'>Todos</option>
                            <option value='Api'>Existentes</option>
                            <option value='Created'>Creados</option>
                        </select>
                        </div>
                        <div className="box">
                        <h1>Orden alfabético:</h1> <select onChange={(e)=>{handleOrderBy(e);}} className='option'>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                        </div>
                        <div className="box">
                        <h1>Orden por peso:</h1><select onChange={(e)=>{handleByWeigth(e);}} className='option'>
                            <option value='asc'>ASC</option>
                            <option value='des'>DES</option>
                        </select>
                        </div>
                        
                 </div>
                </div>
            </div>
            <div className="row">
                { 
                    currentDog && currentDog.map((e)=> {
                       
                        return <Card id={e.id} name={e.name} weight={e.weight} temperament={e.temperament?e.temperament:e.temperaments} image={e.imagen}/>
                       
                    })
                }
            </div>
            <div className="paginado">
                <Paginado dogsxPage={dogsxPage} dogs={dogs.length} paginado={paginado}/>
            </div>
            </>:<>
            <div><img src={Gif}/><h1>SEARCHING...</h1></div>
            </>}
        </div>
            
        
    )
    
}

