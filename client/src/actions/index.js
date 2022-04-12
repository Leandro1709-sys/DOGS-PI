import  axios from 'axios';
import NotFound from '../images/notFound.png'
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPS = 'GET_ALL_TEMPS';
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGTH = 'ORDER_BY_WEIGTH';
export const GET_BY_NAME = 'GET_BY_NAME';
export const POST_DOG = 'POST_DOG';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAN_DOG_ID = 'CLEAN_DOG_ID';


export  function getAllDogs(){
    return async function (dispatch){
      //  console.log('entra getAllDogs');
        const allDogs = await axios.get('http://localhost:3001/dogs');
        //console.log(json);
          dispatch({
            type : GET_ALL_DOGS,
            payload : allDogs.data,
        })

    }
}

export  function getAllTemps(){
    return async function (dispatch){
      // console.log('entra getAllTemps');
        const allTemps = await axios.get('http://localhost:3001/temperaments');
     //   console.log(allTemps, 'del getAllTemps');
          dispatch({
            type : GET_ALL_TEMPS,
            payload : allTemps.data,
        })

    }
}

export  function postDog(payload){
    return async function (dispatch){
//  console.log('payload =>',payload);
  if(payload.imagen===''){

  }
      const posteo = {
        "name":payload.name,
        "height": payload.min_height+' - '+payload.min_height,
        "weight": payload.min_weight+' - '+payload.max_height,
        "life_span": payload.min_life_span+' - '+payload.max_life_span,
        "imagen": payload.imagen!=""?payload.imagen:NotFound,
        "temperament": payload.temperament
    }
   // console.log(posteo);
        const created = await axios.post('http://localhost:3001/dogs',posteo);
   //     console.log('created',created);
        dispatch({
            type : POST_DOG,
            payload : created.data,
        })
    }
}



export function filterByTemp(payload){
    return{
        type: FILTER_BY_TEMP,
        payload ,
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload ,
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload ,
    }
}

export  function getDetail(id){
    return async function (dispatch){
      try{
        const detail = await axios.get('http://localhost:3001/dogs/'+id);
      //  console.log('detalle',detail);
          dispatch({
            type : GET_DETAIL,
            payload : detail.data,
        })

    }catch (e){
        alert(e)
    }
}
}
export function cleanDogId() {
    return (dispatch) => {
      let action = {
        type: CLEAN_DOG_ID,
        payload: [],
      };
      return dispatch(action);
    };
  }
  

export function orderByW(payload){
    return{
        type: ORDER_BY_WEIGTH, 
        payload ,
    }
}

    export function getByName(name){
        return async function (dispatch){
            try{
                 //  console.log('entra getAllDogs');
              const nameDog = await axios.get('http://localhost:3001/dogs?name='+ name);
              //console.log(json);
                dispatch({
                  type : GET_BY_NAME,
                  payload : nameDog.data,
              })
      

            } catch(err){
                alert('No se encontro una raza con la busqueda asociada!')
            }

           
          }
    }

   
