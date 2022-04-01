const {Router} = require('express'); 
const router = Router();
//const axios = require('axios');
const {Temperament} = require('../db'); 

router.get('/', async (req,res,next)=>{
  const temp = await Temperament.findAll();
  res.send(temp)
});


module.exports = router;