import {React} from 'react';
import './card.css'

export default function Card({name,temperament,weight,image}){
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
        console.log('temperamento de creado => ',temperamento);
    }else{
            var temp = temperament.map((e)=>{return e})
            for(let i = 0 ; i<temp.length; i++){
                if(temp[i+1]){
                temperamento=temperamento+temp[i]+', '
                }else{
                    temperamento=temperamento+temp[i];
                }
            }
            console.log('temperamento de creado => ',temperamento);
    }

    } else temperamento=temperament;
    return(
        <div className='card'>
            <img src={image} alt='link' width='300px' height='300px'></img>
            <h3>{name}</h3>
             <h5>{temperamento}</h5> 
            <h3>{weight}</h3>
        </div>
    )
}