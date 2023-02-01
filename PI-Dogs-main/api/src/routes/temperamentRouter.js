const { Router } = require('express');
const { temperamentDB } = require("../Controllers/temperamentsControllers");

const temperamentRouter = Router();

const SUCCESS = 200;
const ERR = 400;

temperamentRouter.get("/", async (req, res) => {
    try {
        const allTemps = await temperamentDB();
        res.status(SUCCESS).json(allTemps)
    } catch (error) {
        res.status(ERR).json({message: "Temperaments is not found"})
    }
})



module.exports = temperamentRouter;