
import "./details.css";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Gif from '../images/search.gif'

const { getDetail, cleanDogId } = require("../actions/index");

export default function Detail() {
  const Dog = useSelector((state) => state.detail);

  //const oso=Dog[0].temperaments.map((e)=>{return e.name});
  //console.log(oso)
  const dispatch = useDispatch();

  let { id } = useParams();
  //console.log( 'use params => ',useParams())

  
  useEffect(() => {
    dispatch(getDetail(id));
    return dispatch(cleanDogId());
  }, [dispatch, id])

  
  console.log('este es mi dog= >',Dog)

// console.log('este es mi oso= >',oso)
  return (
    <div>
      { !Array.isArray(Dog) ? 
        <>
        <div className="container">
           <h2 className='titolin'>DETALLES DE LA RAZA</h2>
          <div className="cardContainer">
            <div className="header">
            <h2 className="nombre">{Dog.name}</h2>
              <img className="imgDet"
                src={Dog.imagen}
                alt="Img not found"
                width="220px"
                height="220px"
              />
              
            </div>
            <div className="description">
    
                  <h4>Altura: {Dog.height} cm</h4>
                
                  <h4>Peso: {Dog.weight} kg</h4>
                
                  <h4>Años de vida: {Dog.life_span}</h4>
                
                  <h4>Temperamentos:</h4>
                  <h4>{Dog.temperaments}</h4>
                
            </div>
            <Link to="/Home" className='link'><a className='btn'>VOLVER AL HOME</a></Link>
          </div>
        </div>
        </> : 
     <>
     <div><img src={Gif}/><h1>SEARCHING...</h1></div>
     </>}
    </div>
  );
}