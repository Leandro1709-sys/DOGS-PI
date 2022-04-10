import React from "react";
import '../styles/landingPage.css';
import {Link} from 'react-router-dom';
import Dog from '../images/Capa 1.png'
import './landing.css'


export default function LandingPage(){
    return(
        <div className="padre">
            <div className="hijo1">
             <div className="perro">
             <img src={Dog} className='imagen'></img>
             <a className="titulo">Find your DOG!</a>
             </div>
           </div>
           <div className="hijo2">
           <Link to='/home' className="boton">INGRESAR </Link>
        </div>
        </div>
       
        
    )
}