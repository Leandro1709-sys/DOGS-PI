import {React} from 'react';
import './card.css'
import { Link } from 'react-router-dom';

export default function Card({id,name,temperament,weight,image,altura}){
    var temperamento='';
    // CONTROL DE FORMATOS DE TEMPERAMENTOS, SI ES LA LLAMADA INCIAL DEL HOME 
    // O ES LA LLAMDA DESDE EL FILTRADO POR TEMPERAMENTOS
    
    if(Array.isArray(temperament)){
        if(temperament[0].name){
        var temp = temperament.map((e)=>{return e.name})
        for(let i = 0 ; i<temp.length; i++){
            if(temp[i+1]){
            temperamento=temperamento+temp[i]+', '
            }else{
            temperamento=temperamento+temp[i];
            }
        }
  
    }else{
            var temp = temperament.map((e)=>{return e})
            for(let i = 0 ; i<temp.length; i++){
                if(temp[i+1]){
                temperamento=temperamento+temp[i]+', '
                }else{
                    temperamento=temperamento+temp[i];
                }
            }
          //  console.log('temperamento de creado => ',temperamento);
    }

    } else temperamento=temperament;
  //  console.log('la i que llega => ',i);
    return(
        
        <div className='card'>
            <div className="card-header">
                <h1>{name}</h1>
            </div>
           <div className='card_body'>
               <div className='data'>
                <img src={image} className='imgCard'></img>
                <p>Peso: {weight} KG<br/></p>
                <p>Altura: {altura} CM<br/>
                {temperamento} 
                </p>
                              
            </div>
                <div className='botonera'>
              <Link to={`/Detail/${id}`} className='btn'><a>DETALLES</a></Link>
              </div>
            </div>
            
        </div>
        
    )
}