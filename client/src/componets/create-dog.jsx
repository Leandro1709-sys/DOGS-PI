import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllTemps, postDog } from "../actions";
//import { postDog, getAllTemps } from "../actions";

function validate(input){
    let errors={}
    if(!input.name){
        errors.name='*campo obligatorio'
    }
}
export default function CreateDog(){
    const dispatch=useDispatch();
  //  const history=useHistory();
    const temperaments=useSelector((state)=>state.allTemps);

    const [input,setInput]=useState({
        name:"",
        min_height:'',
        max_height:'',
        min_weight:'',
        max_weight:'',
        min_life_span:'',
        max_life_span:'',
        imagen: "",
        temperament:[]
    })

   // console.log(input)

    // useEffect(()=>{
    //     dispatch(getAllTemps());},[dispatch]);

    function handleChange(e){
      //  e.preventDefault();
      console.log(e.target.name)
     // let t=e.target.name;
       setInput({...input,
        [e.target.name]:e.target.value
    })
   // console.log(input)
    }

    function handleSelect(e){
       // console.log('entra handleSelect')
       // e.preventDefault();
       setInput({...input,
        temperament:[...input.temperament, e.target.value]
    })
 //   console.log(input)
}
function hadleSubmit(e){
    e.preventDefault();
    dispatch(postDog(input));
    alert('La raza fue agregada correctamente!');
    setInput({
        name:"",
        min_height:'',
        max_height:'',
        min_weight:'',
        max_weight:'',
        min_life_span:'',
        max_life_span:'',
        imagen: "",
        temperament:[]
    });
   // history.push('/home')
}
    
        return(
    <div> 
    <Link to="/home"><button>Ir al home</button></Link>
        <h1>Crea la nueva Raza!</h1>
        <form onSubmit={(e)=>hadleSubmit(e)} className='form'>
            <div>
                <label>Nombre:</label>
                <input type="text"  value={input.name} name="name"  onChange={(e)=>handleChange(e)} />
                {input.name===''&&<a className="errors">*campo obligatorio</a>}
            </div>
            <div>
                <label>Altura:</label>
                <input type="text" onChange={(e)=>handleChange(e)} style={{width:'80px'}} value={input.min_height} name="min_height" placeholder="min"/>
                {input.name===''&&<a className="errors">*campo obligatorio</a>} - 
                <input type="text" onChange={(e)=>handleChange(e)} style={{width:'80px'}} value={input.max_height} name="max_height" placeholder="max"/>
                {input.name===''&&<a className="errors">*campo obligatorio</a>}
            </div>
            <div>
                <label>Peso:</label>
                <input type="text" onChange={(e)=>handleChange(e)} value={input.min_weight} name="min_weight" placeholder="min"></input>
                {input.name===''&&<a className="errors">*campo obligatorio</a>}        - 
                <input type="text" onChange={(e)=>handleChange(e)} value={input.max_weight} name="max_weight" placeholder="max"></input>
                {input.name===''&&<a className="errors">*campo obligatorio</a>}
            </div>
            <div>
                <label>Años de vida:</label>
                <input type="text" onChange={(e)=>handleChange(e)} value={input.min_life_span} name="min_life_span" placeholder="desde"></input>
                {input.name===''&&<a className="errors">*campo obligatorio</a>} - 
                <input type="text" onChange={(e)=>handleChange(e)} value={input.max_life_span} name="max_life_span" placeholder="hasta"></input>
                {input.name===''&&<a className="errors">*campo obligatorio</a>}
            </div>
            <div>
                <label>Imagen (url):</label>
                <input type="text" value={input.imagen} onChange={(e)=>handleChange(e)} name="imagen" placeholder="ingrese URL"></input>
            </div>
             <div>  
                 Seleecione los Temperamentos:<select onChange={(e)=>handleSelect(e)}>
                {
                 temperaments?.map((e)=>{
                     return(<option value={e.name} >{e.name}</option>)
                 })  } 
                </select>

             </div> 
             <div>
             Temperamentos Seleccionados:
                 { input.temperament.length?input.temperament.map((e)=>{
                    
                 return <li style={{color:"green"}}> {e} </li>
                 }):<li style={{color:"red"}} > Seleccione al menos un temperamento</li>}
             </div>
            <input type="submit" value="submit"/>
            </form>
          
    </div>
    
    )
}
    