const { get } = require ("axios");
const { URL_PATH_API, API_KEY } = process.env;
const { Temperaments } = require("../db");


const getDogsApi = async () => {
    const dogsApi = await get(`${URL_PATH_API}?api_key=${API_KEY}`);
    const dogsInfo = await dogsApi.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            image: dog.image.url,
            temperaments: dog.temperament,
            life_span: dog.life_span,
            bred_for: dog.bred_for,
        }
    })
    return dogsInfo;
};

const temperamentDB = async () => {
    const dogs = await getDogsApi();
    const temp = dogs.map(dog => dog.temperaments).join().split(",");
    const tempDB = temp.map(element => element.trim());

    tempDB.forEach(element => {
        if(element) {
            Temperaments.findOrCreate({
                where: {
                    name: element
                }
            })
            
        }
        
    });
    
    const allTemperaments = await Temperaments.findAll();
    return allTemperaments;
};

module.exports = {
    getDogsApi,
    temperamentDB
};