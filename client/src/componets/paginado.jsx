
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
        <nav>
            <ul className='paginado'>
                {pageNumber &&
                pageNumber.map(number=>(
                       <li className='number' key={`${number}`}>
                       <a onClick={()=>paginado(number)} >{number}</a>
                       </li>
                ))}
            </ul>
        </nav>
    )

}
