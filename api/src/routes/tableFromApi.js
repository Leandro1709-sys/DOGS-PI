///////////////////////////////////////////////////////////////////
/////// LLENADO DE TABLA DE TEMPERAMENTOS DESDE LA API   //////////
//////////////////////////////////////////////////////////////////

const axios = require('axios');
const {Temperament} = require('../db'); 


module.exports = async()=>{
    //console.log('entra App Info')
        var newArray=[]
        var temperaments=[];
        var word='';
        const dogFind = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=965a70f9-1376-41d2-9150-9b9f0703c803');
        const tempData = await dogFind.data.map(e=>{
            if( e.temperament){
                newArray.push(e.temperament.replace(/,/g,''));
            } else {
                newArray.push('Sin_temperamento_asociado');
            }   
        });
        newArray.map(e=>{
        //console.log('MAP')
          var x=0;
          for(i=0; i <= e.length ; i++){
           // console.log(e[i])
              if (e[i]===' '){
                //console.log('if del FOR')
                word=e.slice(x, i)
                if(!temperaments.includes(word)){
                    // INSERTO EL REGISTRO EN LA TABLA//
                    Temperament.create({
                        name: word,
                      })
                    //GUARDO LO INSERTADO EN MI ARREGLO//
                    temperaments.push(word);
               }
                x=i+1;
              } else if(!e[i]){
               // console.log('ELSE if del FOR')
                word=e.slice(x, i)
                if(!temperaments.includes(word)){
                    Temperament.create({
                        name: word,
                      })
                      temperaments.push(word);
                    }
                
              }
          }
      })
};
