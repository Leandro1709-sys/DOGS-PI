import {GET_ALL_DOGS,GET_ALL_TEMPS, FILTER_BY_TEMP,FILTER_CREATED,ORDER_BY_NAME,ORDER_BY_WEIGTH,GET_BY_NAME,POST_DOG} from '../actions/index'


const initialState = {
     dogsBreed : [],
     allTemps: [],
     dogsAll :[],
    
     
}

export default function reducer(state=initialState, {type, payload}){
    switch(type){       
        case GET_ALL_DOGS:
        //   console.log('GET_ALL_DOGS')
            return {
                ...state,
                dogsBreed : payload,
                dogsAll : payload
            };
        case GET_ALL_TEMPS:
          // console.log('GET_ALL_TEMPS')
            return {
                ...state,
                allTemps : payload
            };
            case GET_ALL_TEMPS:
          // console.log('GET_ALL_TEMPS')
            return {
                ...state,
                allTemps : payload
            };
          case FILTER_BY_TEMP :
           // console.log('GET_ALL_TEMPS')
           const allDogs=state.dogsAll;
           var newTemp=[];
           //console.log('selected= ',payload,' allDogs = ',all)

           // ACA FILTRO LOS DATOS CREADOS Y CREO UN ARRAY SIMPLE PARA LOS TEMERAMENTOS DE LOS MISMOS

           for(let i = 0; i<allDogs.length;i++){
               
                if(allDogs[i].temperaments[0].name){
                    console.log('entra if del for')
                    for(let x=0; x < allDogs[i].temperaments.length; x++){
                        newTemp.push(allDogs[i].temperaments[x].name)
                    }
                    allDogs[i].temperaments = newTemp;
                }
            }
        
            const filtred = payload==='All'?allDogs:allDogs.filter((e)=>e.temperaments.includes(payload)) 
    
    
         
           return{
                ...state,
                dogsBreed : filtred,
            };
         
            case POST_DOG :
          
            return{
                ...state,
             }
         
             case ORDER_BY_NAME :
                // console.log('GET_ALL_TEMPS')
                let sortedDog= payload==='asc'?
                state.dogsBreed.sort(function (a,b){
                    if(a.name>b.name){
                        return 1;
                    }
                    if(a.name<b.name){
                        return -1;
                    }
                    else
                        return 0;
                    
                }): state.dogsBreed.sort(function (a,b){
                    if(a.name>b.name){
                        return -1;
                    }
                    if(a.name<b.name){
                        return 1;
                    }
                    else
                        return 0;
                    
                })
                  return{
                    ...state,
                    dogsBreed : sortedDog,
                 }
                 case ORDER_BY_WEIGTH :
                 console.log('ORDER_BY_WEIGTH')
            
                let sortedWeigth= payload==='asc'?
                state.dogsBreed.sort(function (a,b){
                    if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                        return 1;
                    }
                    if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                        return -1;
                    }
                    else
                        return 0;
                    
                }): state.dogsBreed.sort(function (a,b){
                    if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                        return -1;
                    }
                    if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                        return 1;
                    }
                    else
                        return 0;
                    
                })
                  return{
                    ...state,
                    dogsBreed : sortedWeigth,
                 }
            case GET_BY_NAME :
                return{
                    ...state,
                    dogsBreed : payload,
                }
          default : return state
    }  
};





