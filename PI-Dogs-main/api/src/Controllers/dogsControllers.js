const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const getDogs = async () => {
  const dogs = await Dog.findAll({
    include:  Temperament,
  });
  return dogs;
};

const findDogs = async (name) => {
  let upperName = name.charAt(0).toUpperCase() + name.slice(1);
  const results = await Dog.findAll({
    include:  Temperament,
    where: {
      name: { [Op.iLike]: `%${upperName}%` },
    },
  });
  if (results.length) return results;
  else throw Error(`This dog breed was not found: ${name.toUpperCase()} `);
};


const createDog = async ( name, height, weight, lifeSpan, image, bred_for, temperamentName ) => {
  if (!name || !height || !weight) throw Error("Mandatory data is missing");

  const newDog = await Dog.create({
    name,
    height,
    weight,
    lifeSpan,
    image,
    bred_for,
  });

  const pushTemp = await Temperament.findAll({
    where: {
      name: temperamentName,
    },
  });

  await newDog.addTemperament(pushTemp);
  return newDog;
};

module.exports = {
  getDogs,
  createDog,
  findDogs,
};
