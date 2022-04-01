const { Router } = require('express');
const  dogs = require('./dogs.js');
const  temp = require('./temperaments.js');
//const express = require()


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogs);
router.use('/temperaments', temp);

module.exports = router;
