import './create-dog.css'
import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllDogs, postDog } from "../actions";
//import { postDog, getAllTemps } from "../actions";

function validate(input){
    let errors={}
    if(!Number(input.min_height)){
        errors.min_height='*debe ser un número';
    }else if(input.max_height&&parseInt(input.min_height)>parseInt(input.max_height)){
        errors.max_height='*La altura máxima no puede ser inferior a la mínima!';
    }

    if(!Number(input.max_height)){
        errors.max_height='*debe ser un número';
    }

    if(!Number(input.min_weight)){
        errors.min_weight='*debe ser un número';
    }else if(input.max_weight&&parseInt(input.min_weight)>parseInt(input.max_weight)){
        errors.max_weight='*El peso maximo no puede ser inferior al minimo';
    }
    if(!Number(input.max_weight)){
        errors.max_weight='*debe ser un número';
    }

    if(!Number(input.min_life_span)){
        errors.min_life_span='*debe ser un número';
    } else if(input.max_life_span&&parseInt(input.min_life_span)>parseInt(input.max_life_span)){
        errors.max_life_span='*Hasta no puede ser iferior a desde';
    }
    if(!Number(input.max_life_span)){
        errors.max_life_span='*debe ser un número';
    }
    if(input.imagen){
        var r = new RegExp(/^(ftp|http|https):[^ "]+$/);
        if(!r.test(input.imagen)){
            errors.imagen = '*Ingrese una URL válida'
        }

    }
    return errors
    
}
export default function CreateDog(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const temperaments=useSelector((state)=>state.allTemps);
    const [errors,setErrors]=useState({

    })
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

   console.log('input => ',input)

    // useEffect(()=>{
    //     dispatch(getAllTemps());},[dispatch]);

    function handleChange(e){
    //   console.log(e.target.name)
       setInput({...input,
        [e.target.name]:e.target.value
    })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value}))
   // console.log(errors)
    }

    function handleSelect(e){
     //   console.log('value del target SLECT',e.target.value)
       // e.preventDefault();
       if(input.temperament.includes(e.target.value)){
        alert('Ya seleccionó ese temperamento! :)')
    } else {
       setInput({...input,
        temperament:[...input.temperament, e.target.value]
    })
}
    
}

    function handleDel(e){
         //console.log(input.temperament)
        e.preventDefault();
       
        setInput({...input,
         temperament:input.temperament.filter(el=>el!=e.target.value)
     })
    
}
 //   console.log(input)

function hadleSubmit(e){
    e.preventDefault();
   //    console.log(input)
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
    dispatch(getAllDogs());
   navigate('/home')
}
//habilito el boton solo si no hay errores


return(

    <div className="formulario"> 
    
        <h2 className='titolin'>RELLENE EL FORMULARIO</h2>
        <form onSubmit={(e)=>hadleSubmit(e)} className='form'>
            <div className='raza'>
                <label className='labels'>Nombre de la Raza:</label>
                <input type="text"  value={input.name} name="name" className='name' onChange={(e)=>handleChange(e)} />
                {input.name===''?<a className="errors"> *campo obligatorio </a>:<a className="errors2">Comlpetado correctamente!</a>}
            </div>
           
            <div className='raza'>
                <label className='labels'>Altura mínima:</label>
                    <input className='name' type="text" onChange={(e)=>handleChange(e)}  value={input.min_height} name="min_height" placeholder="centímetros..."/>
                    {input.min_height===''?
                    <a className="errors"> *campo obligatorio </a>
                    :errors.min_height?
                    <a className="errors">{errors.min_height}</a>:
                    <a className="errors2">Comletado correctamente!</a>} 
            </div>
           
            <div className='raza'>
                <label className='labels'>Altura máxima:</label>
                    <input className='name' type="text" onChange={(e)=>handleChange(e)}  value={input.max_height} name="max_height" placeholder="centímetros..."/>
                    {input.max_height===''?<a className="errors"> *campo obligatorio </a>:errors.max_height?<a className="errors">{errors.max_height}</a>:<a className="errors2">Comletado correctamente!</a>}
            </div >
            <div className='raza'>
                <label className='labels'>Peso mínimo:</label>
                    <input className='name' type="text" onChange={(e)=>handleChange(e)} value={input.min_weight} name="min_weight" placeholder="kilogramos..."></input>
                    {input.min_weight===''?<a className="errors">*campo obligatorio</a>:errors.min_weight?<a className="errors">{errors.min_weight}</a>:<a className="errors2">Comletado correctamente!</a>}
            </div>
            <div className='raza'>
                <label className='labels'>Peso máximo:</label>
                    <input className='name' type="text" onChange={(e)=>handleChange(e)} value={input.max_weight} name="max_weight" placeholder="kilogramos..."></input>
                    {input.max_weight===''?<a className="errors">*campo obligatorio</a>:errors.max_weight?<a className="errors">{errors.max_weight}</a>:<a className="errors2">Comletado correctamente!</a>}
            </div>
            <div className='raza'>
                Años de vida:
                </div>
            <div className='raza'>
            <label className='labels'>Desde:</label>
                <input className='name' type="text" onChange={(e)=>handleChange(e)} value={input.min_life_span} name="min_life_span" placeholder="años"></input>
                {input.min_life_span===''?<a className="errors">*campo obligatorio</a>:errors.min_life_span?<a className="errors">{errors.min_life_span}</a>:<a className="errors2">Comletado correctamente!</a>}
            </div>
            <div className='raza'>
            <label className='labels'>Hasta:</label>
                <input className='name' type="text" onChange={(e)=>handleChange(e)} value={input.max_life_span} name="max_life_span" placeholder="años"></input>
                {input.max_life_span===''?<a className="errors">*campo obligatorio</a>:errors.max_life_span?<a className="errors">{errors.max_life_span}</a>:<a className="errors2">Comletado correctamente!</a>}
            </div>
            <div className='raza'>
                <label className='labels'>Imagen (url):</label>
                <input className='name' type="text" value={input.imagen} onChange={(e)=>handleChange(e)} name="imagen" placeholder="ingrese URL"></input>
                {input.imagen!=''&&errors.imagen!=''?<a className="errors">{errors.imagen}</a>:''}
            </div>
             <div className='raza'>  
                 Seleecione los Temperamentos:<select onChange={(e)=>handleSelect(e)}>
                {
                 temperaments?.map((e)=>{
                     return(<option value={e.name} >{e.name}</option>)
                 })  } 
                </select>

             </div> 
             <ul >
             Temperamentos Seleccionados:
                 { input.temperament.length?input.temperament.map((t)=>{
                    
                 return <li value={t} key={t}> {t} <button value={t} onClick={(e)=>handleDel(e)} className='elimina'>X</button></li>
                 }):<li className='errors' > Debe selecionar al menos un temperamento!</li>}
             </ul>
             <div className="botonera">
             { //VALIDACION DE ESTADO PARA HABILITAR BOTON
                 input.name===''||input.min_height===''||input.max_height===''||input.min_weight===''
                 ||input.max_weight===''||input.min_life_span===''||input.max_life_span===''||errors.min_height||errors.max_height||errors.min_weight
                 ||errors.max_weight||errors.min_life_span||errors.max_life_span||errors.imagen
                 ||!input.temperament.length?<button className="botonso23" type="submit" disabled='true'><span> Errores en el Fromulario </span></button>
                 : <button className="botonso2" type="submit" ><span>Crear RAZA!</span> </button>
             }
            
            <Link to="/Home" className='linktohome'><button className='botonso'><span>volver al home</span></button></Link>              
            </div>
            </form>
          
    </div>
    
    )
}
    