
import "./paginado.css";

export {React} from 'react';


export default  function Paginado ({dogsxPage,dogs,paginado}){

// console.log('dogsxPage',dogsxPage)  
// console.log('dogs',dogs)   
// console.log('paginado',paginado)    
   
    const pageNumber = [];

    for(let i=0; i < Math.ceil(dogs/dogsxPage);i++){
        pageNumber.push(i+1)
    }
    //console.log(pageNumber,'numero de pagina')

    return(
        <nav className="paginador">
            <div className='number'>
              
                {pageNumber &&
                pageNumber.map(number=>(
                       
                    <h1 onClick={()=>paginado(number)} className='numero'>{number}</h1>
                       
                ))}
            </div>
        </nav>
    )

}
