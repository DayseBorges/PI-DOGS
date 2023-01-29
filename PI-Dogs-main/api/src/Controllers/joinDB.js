const { getDogsApi } = require("./temperamentsControllers");
const { getDogs } = require("./dogsControllers");

const allDogs = async () => {
    const dataApi = await getDogsApi();
    const dataDB = await getDogs();
    const allDogs = [...dataDB, ...dataApi ]; 
    return allDogs;
}

module.exports = {
    allDogs
}