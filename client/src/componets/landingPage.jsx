import React from "react";
import '../styles/landingPage.css';
import {Link} from 'react-router-dom';
import Dog from '../images/dogPNG.png'


export default function LandingPage(){
    return(
        <div className="padre">
            <div className="hijo1">
             <h1 className="titulo">Wellcome to Find your DOG!</h1>
          
           </div>
           <div className="hijo2">
           <Link to='/home' className="boton">
           <a className="a">INGRESAR!</a>
               </Link>
            </div>
        </div>
       
        
    )
}