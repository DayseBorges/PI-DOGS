const { Router } = require('express');
const dogRouter = require("./dogRouters");
const temperamentRoutes = require("./temperamentRoutes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogRouter);
router.use("/temperaments", temperamentRoutes);

module.exports = router;
