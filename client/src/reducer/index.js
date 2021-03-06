import {GET_ALL_DOGS,GET_ALL_TEMPS,
    FILTER_BY_TEMP,FILTER_CREATED,
    ORDER_BY_NAME,ORDER_BY_WEIGTH,
    GET_BY_NAME,POST_DOG,GET_DETAIL,CLEAN_DOG_ID} from '../actions/index'


const initialState = {
     dogsBreed : [],
     allTemps: [],
     dogsAll :[],
     detail:[],
     byName:[]
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
       case POST_DOG:
                // console.log('GET_ALL_TEMPS')
                  return {
                      ...state,
                  };
              
        
        case FILTER_CREATED :
                // console.log('GET_ALL_TEMPS')
                const all=state.dogsAll;
                const filtredCreated = payload==='Created'?all.filter((e)=>e.created):all.filter((e)=>!e.created)
               console.log(filtredCreated)
                if(!filtredCreated.length){
                    alert('No hay razas de perros creadas!')
                    return{
                        ...state,
                        dogsBreed : state.dogsAll,
                    }
                }else{
                return{
                     ...state,
                     dogsBreed : payload==='All'?state.dogsAll:filtredCreated,
                 }
                }
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
                console.log('ORDER_BY_WEIGTH',state.dogsBreed)
                let newState2=state.dogsBreed.filter((e)=>e.weight.length>3);
                let newState=newState2.filter((e)=>!e.weight.includes('NaN'));
                let sortedWeigth= payload==='asc'?
                newState.sort(function (a,b){
                    if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                        return 1;
                    }
                    if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                        return -1;
                    }
                    else
                        return 0;
                    
                })
                : newState.sort(function (a,b){
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
             if(!payload.err){
                return{
                    ...state,
                    dogsBreed : payload,
                    byName: [1]
                  
                }
                
            }else{
                alert(payload.err)
               return{ ...state }
            }

            case GET_DETAIL : 
            if(!payload.err){
                return{
                    ...state,
                    detail : payload,
                }
                
            }else{
                alert(payload.err)
               return{ ...state }
            }
            case CLEAN_DOG_ID:
                return {
                    ...state,
                    detail: [],
                };

          default : return state
    }  
};





