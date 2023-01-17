const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");



const getDogs = async () => {
    const dogs = await Dog.findAll({
        attributes: {
            exclude:["id", "height", "life_span"]
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    return dogs; 
};

const findDogs = async (name) => {
    let upperName = name.charAt(0).toUpperCase() + name.slice(1);
    const results = await Dog.findAll({
        where: {
            name: { [Op.iLike]: `%${upperName}%` },
        },
    });
    if (results.length) return results;
    else throw Error(`This dog breed was not found: ${name.toUpperCase()} `);
};

const createDog = async ( 
    name, 
    heightMin, 
    heightMax, 
    weightMin, 
    weightMax, 
    lifeSpanMin,
    lifeSpanMax,
    image, 
    bred_for, 
    temperaments) => {

    const newDog = await Dog.create({ 
        name, 
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`, 
        lifeSpan: `${lifeSpanMin} - ${lifeSpanMax} years`, 
        temperaments,
        image: image || 'https://dog.ceo/api/breeds/image/random', 
        bred_for 
    });

    temperaments.forEach(async element => {
        const searchTemp = await Temperament.findAll({
            where: { name: element }
        });
        await newDog.addTemperament(searchTemp[0]);
    })

};



module.exports = {
    getDogs,
    createDog,
    findDogs
  };