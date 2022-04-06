///////////////////////////////////////
/////// RUTAS DOGS           //////////
///////////////////////////////////////
const {Router} = require('express'); 
const router = Router();
const axios = require('axios');
const {Dog,Temperament} = require('../db'); 


const getApiInfo = async()=>{
   // console.log('entra App Info')
    try{
        const dogFind = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=965a70f9-1376-41d2-9150-9b9f0703c803');
       //console.log(dogFind)
        const dogData = await dogFind.data.map(el=>{
            return {
                id: el.id,
                name: el.name,
                imagen: el.image.url,
                height: el.height.metric,
                weight: el.weight.metric,
                life_span: el.life_span,
                temperaments: el.temperament?el.temperament:"no tiene timperamentos",
            }
        });
       // console.log(dogData)
        return dogData;
    } catch(e){
        return e;
    }
   
};


const getDbInfo = async()=>{
   // console.log('entra getDbInfo')
    try{
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through:{
                    attributes:[]
                }
            }
        })
    } catch(e){
        return e;
    }
     
    
    
};

const getAllDogs = async ()=>{
    console.log('entra getAllDogs')
    try{
        let dbInfo = await getDbInfo();
        let apiInfo = await getApiInfo();
        if(dbInfo[0]){
            let info = dbInfo.concat(apiInfo);
            return info;
        }else{
        return apiInfo;
            }
    } catch(e){
        return e;
    }
 
};

router.get('/', async (req,res,next)=>{
    try {
    const {name}=req.query;
    const allDogs= await getAllDogs();
    if(name){
       // console.log(allDogs)
            //filtro en minusculas para evitar diferencias de tipeo del usuario
            let newDog=allDogs.filter((e)=>e.name.toLowerCase().includes(name.toLowerCase()))
        //console.log('nuevo ',newDog);
        newDog.length?res.send(newDog):res.send({err:'No se encontro ninguna raza asociada con la busqueda...'})
      
    } else {
        res.send(allDogs)
    }
} catch (err){
    res.status(404).send(err)

}
});

router.get('/:id', async (req,res,next)=>{
    //  console.log('entra /id')
    const {id}=req.params;
    // console.log(req.params.id)
    const allDogs= await getAllDogs();
    //console.log(allDogs)
    if(id){
        console.log(allDogs)
            let newDog=allDogs.filter((e)=>e.id==id)
        console.log('nuevo ',newDog);
        newDog.length?res.send(newDog):res.send({msg:'no se encontro ninguna raza'}) 
    } 
});

router.post('/', async (req,res,next)=>{
    /*  name
        height (Diferenciar entre altura mínima y máxima)
        weight (Diferenciar entre peso mínimo y máximo)
        life_span */
    const {name, height,weight,life_span,created,imagen,temperament} = req.body
    
    //inserto nuevo perro en la db
    let newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        imagen,
        created,//null por defecto
    }) 

    //busco relacion entre los temperamentos pasados por boy con la tabla de temperamentos de mi db
    let temp = await Temperament.findAll({
        where:{name:temperament}
    }) 
    // let oso=temp.map((e)=>{return e.dataValues.name})
    // console.log(oso)


    //relaciono la tabla Dog, con la de temperamento en dogXtemperament
    newDog.addTemperament(temp);
    res.send('Se agregó correctamente la nueva raza!')
});


module.exports = router;