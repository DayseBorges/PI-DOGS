const { Router } = require('express');
const dogRouter = require("./dogRouters.js");
const temperamentRouter = require("./temperamentRoutes.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogRouter);
router.use("/temperaments", temperamentRouter);

module.exports = router;
