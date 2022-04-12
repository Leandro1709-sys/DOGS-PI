
import "./paginado.css";
export {React} from 'react';


export default  function Paginado ({dogsxPage,dogs,paginado}){

// console.log('dogsxPage',dogsxPage)  
// console.log('dogs',dogs)   
// console.log('paginado',paginado)    
   
    const pageNumber = [];
  //  console.log(pageNumber)

    for(let i=0; i < Math.ceil(dogs/dogsxPage);i++){
        pageNumber.push(i+1)
    }
    //console.log(pageNumber,'numero de pagina')
  setTimeout(() => {
    const btnContainer = document.getElementById("MyId");
   // console.log('boton container', btnContainer);
    // Get all buttons with class="btn" inside the container
  if(btnContainer) { var btns = btnContainer.getElementsByClassName("numero");
    
    // // Loop through the buttons and add the active class to the current/clicked button
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
    
        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
    
        // Add the active class to the current/clicked button
        this.className += " active";
      });
    }
}
    
  }, 1000);
   var a=0;
    return(
        
        <nav className="paginador">
            <div id="MyId" className="number">

           
                {pageNumber &&
                pageNumber.map(number=>(
                    
                    <a onClick={()=>paginado(number)} className="numero" value={number}>{number}</a>
                    
                ))}    
          
            </div>
        </nav>
    )

}
