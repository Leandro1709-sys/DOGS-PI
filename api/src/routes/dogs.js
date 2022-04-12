///////////////////////////////////////
/////// RUTAS DOGS           //////////
///////////////////////////////////////
const {Router} = require('express'); 
const router = Router();
const axios = require('axios');
const {Dog,Temperament} = require('../db'); 


const getApiInfo = ()=>{
   // console.log('entra App Info')
   const dogData1=
        axios.get('https://api.thedogapi.com/v1/breeds?api_key=965a70f9-1376-41d2-9150-9b9f0703c803')
        .then((respuesta)=>respuesta.data.map(e=>{
            return {
                id: e.id,
                name: e.name,
                imagen: e.image.url,
                height: e.height.metric,
                weight: e.weight.metric,
                life_span: e.life_span,
                temperaments: e.temperament?e.temperament:"Sin temperamento asignado",
            }
        }))

        return dogData1;
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
    //console.log('entra getAllDogs')
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
  try{  //  console.log('entra /id')
    const {id}=req.params;
    // console.log(req.params.id)
    const allDogs= await getAllDogs();
    //console.log(allDogs)
    if(id){
        //console.log(allDogs)
        const newDog=allDogs.filter((e)=>e.id==id)

        if(Array.isArray(newDog[0].temperaments)){
        var temps=newDog[0].temperaments.map((e)=>{return e.dataValues.name})
        temps=temps.toString();
        } else{
        var temps=newDog[0].temperaments;
        }
        var resultado={      
                name :newDog[0].name,
                height:newDog[0].height,
                weight:newDog[0].weight,
                life_span:newDog[0].life_span,
                imagen:newDog[0].imagen,
                temperaments:temps
                }
           }


        //newDog[0].temperaments=oso
        //console.log(temps);
        res.status(202).send(resultado);}
        catch (e){
            res.status(404).send(e)
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

router.delete('/:id', (req,res,next)=>{
        const {id} = req.params;
     
             Dog.destroy({
                where: {
                  id: id
                }
              }).then(()=> res.status(202).send('Borrado!').catch((err)=>res.status(404).send(err))
              )

        
})

module.exports = router;