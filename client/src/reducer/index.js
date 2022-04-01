import {GET_ALL_DOGS} from '../actions/index'

const initialState = {
     dogsBreed : [ {
        "id": 1,
        "name": "Affenpinscher",
        "imagen": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
        "height": "23 - 29",
        "weight": "3 - 6",
        "life_span": "10 - 12 years",
        "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
    },
    {
        "id": 2,
        "name": "Afghan Hound",
        "imagen": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
        "height": "64 - 69",
        "weight": "23 - 27",
        "life_span": "10 - 13 years",
        "temperament": "Aloof, Clownish, Dignified, Independent, Happy"
    },],
    
}

export default function reducer(state=initialState, action){
    switch(action.type){       
        case GET_ALL_DOGS:
            console.log('GETALLDOGS')
            return{
                ...state,
                dogsBreed : action.payload,
            }
        default : return state
    }  

};

