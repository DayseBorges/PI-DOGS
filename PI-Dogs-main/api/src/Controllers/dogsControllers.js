const { Dog, Temperaments } = require("../db");
const { Op } = require("sequelize");


const getDogs = async () => {
  const dogs = await Dog.findAll({
    include:  {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }
  });
  return format(dogs);
};

const format = (dogs) => {
  let breedsFormated = dogs.map(({ id, name, height, weight, lifeSpan, bred_for, image, temperaments = [] }) => {
    return {
      id,
      name,
      height,
      weight,
      lifeSpan,
      bred_for,
      image,
      temperaments: temperaments
        .map((temperament) => {
          return temperament.name;
        })
        .join(", "),
    };
  });
  return breedsFormated;
}

const findDogs = async (name) => {
  let upperName = name.charAt(0).toUpperCase() + name.slice(1);
  const results = await Dog.findAll({
    where: {
      name: { [Op.iLike]: `%${upperName}%` },
    },
    include:  Temperaments,
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
  });

  temperaments.forEach(async (element) => {
    const pushTemp = await Temperaments.findAll({
      where: {
        name: element,
      },
    });
 
    await newDog.addTemperaments(pushTemp);
    
  })
  return newDog;
};


module.exports = {
  getDogs,
  createDog,
  findDogs,
};
