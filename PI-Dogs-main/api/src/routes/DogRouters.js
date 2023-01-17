const { Router } = require('express');
const { getDogs, createDog, findDogs } = require("../Controllers/dogsControllers")
const { joinDB } = require("../Controllers/joinDB")

const SECCESS = 200;
const ERR = 400;
const join = joinDB();

const dogRouter = Router();

dogRouter.get("/", async (req, res) => {
    const { name } = req.query;
    let dogs;
    try {
        if(name) dogs = await findDogs(name);
        else dogs = await getDogs();
        res.status(SECCESS).json(dogs);
    } catch (error) {
        res.status(ERR).json({ error: error.message })
    }
});

dogRouter.get("/:idDog", async (req, res) => {
    try {
        const id = req.params.idDog;
        
        if (id) {
            const search = await join.find(dog => dog.id == id)
            search ? 
            res.status(SECCESS).send(search) :
            res.status(ERR).json(`Breed not found by Id: ${idDog}`)
        }
    } catch (error) {
        res.status(ERR).json({ error: error.message })
    }
})

dogRouter.post("/", async (req, res) => {
    try {
        const { 
            name, 
            heightMin, 
            heightMax, 
            weightMin, 
            weightMax, 
            life_span, 
            image, 
            bred_for, 
            temperaments } = req.body;

        let newDog = await createDog( 
            name, 
            heightMin, 
            heightMax, 
            weightMin, 
            weightMax, 
            life_span, 
            image, 
            bred_for, 
            temperaments );
        res.status(SECCESS).json(newDog);
    } catch (error) {
        res.status(ERR).json({ error: error.message })
    }
});


module.exports = dogRouter;