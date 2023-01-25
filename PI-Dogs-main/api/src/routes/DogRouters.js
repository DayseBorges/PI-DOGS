const { Router } = require('express');
const { getByID, createDog, findDogs } = require("../Controllers/dogsControllers")
const { allDogs } = require("../Controllers/joinDB")

const SECCESS = 200;
const ERR = 400;


const dogRouter = Router();

dogRouter.get("/", async (req, res) => {
    const { name } = req.query;
    let dogs;
    try {
        if(name) dogs = await findDogs(name);
        else dogs = await allDogs();
        res.status(SECCESS).json(dogs);
    } catch (error) {
        res.status(ERR).send(error.message)
    }
});

dogRouter.get("/:idRaza", async (req, res) => {
    try {
        const { idRaza } = req.params;
        const allDog = await allDogs();
        if (!idRaza) {
            res.status(404).json("This ID was not found")
        } else {
            const dog = allDog.find(dog => dog.id.toString() === idRaza);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(ERR).send(error.message)
    }
});

dogRouter.post("/", async (req, res) => {
    let { name, height, weight, lifeSpan, image, bred_for, temperamentName } = req.body;
    try {
        let newDog = await createDog( name, height, weight, lifeSpan, image, bred_for, temperamentName );
        res.status(SECCESS).json(newDog);
    } catch (error) {
        res.status(ERR).send(error.message)
    }
});


module.exports = dogRouter;