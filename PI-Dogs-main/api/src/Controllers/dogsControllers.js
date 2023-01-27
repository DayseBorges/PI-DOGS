const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
// const { allDogs } = require("../Controllers/joinDB")


const getDogs = async () => {
  const dogs = await Dog.findAll({
    include:  Temperament,
  });
  return dogs;
};

const findDogs = async (name) => {
  let upperName = name.charAt(0).toUpperCase() + name.slice(1);
  const results = await Dog.findAll({
    where: {
      name: { [Op.iLike]: `%${upperName}%` },
    },
    include:  Temperament,
  });
  if (results.length) return results;
  else throw Error(`This dog breed was not found: ${name} `);
};


const createDog = async ( name, heightMin, heightMax, weightMin, weightMax, lifeSpanMin, lifeSpanMax, image, bred_for, temperaments ) => {
  if (!name || !heightMin || !heightMax || !weightMin || !weightMax) throw Error("Mandatory data is missing");

  
  const newDog = await Dog.create({
        name: name[0].toUpperCase() + name.slice(1), 
        height: `${heightMin} - ${heightMax}`, 
        weight: `${weightMin} - ${weightMax}`, 
        lifeSpan: lifeSpanMin && lifeSpanMax ? `${lifeSpanMin} - ${lifeSpanMax} years` : null,
        image: image ? image : null, 
        bred_for: bred_for ? bred_for : null,
        temperaments: temperaments,
  });

  temperaments.forEach(async (element) => {
    const pushTemp = await Temperament.findAll({
      where: {
        name: element,
      },
    });
    await newDog.addTemperament(pushTemp[0]);
  })
  return newDog;
};


module.exports = {
  getDogs,
  createDog,
  findDogs,
};
