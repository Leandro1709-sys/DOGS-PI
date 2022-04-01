import {React} from 'react';

export default function Card({name,temperament,weight,image}){
    return(
        <div>
            <img src={image} alt='link'></img>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h3>{weight}</h3>
        </div>
    )


}