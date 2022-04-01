import React from "react";
//import '../styles/landingPage.css';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <div>
            <h1>Bienvenido a Puppy-Seacrch</h1>
           <Link to='/home'>
               <h1>Entrar</h1>
           </Link>
           </div>
        </div>

    )
}