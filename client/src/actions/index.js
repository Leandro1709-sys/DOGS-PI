import  axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';

export  function getAllDogs(){
    return async function (dispatch){
        var getDogs = await axios.get('http://localhost:3001/dogs');
        console.log('dddd');
        return dispatch({
            type : GET_ALL_DOGS,
            payload : getDogs,
        })

    }
}


