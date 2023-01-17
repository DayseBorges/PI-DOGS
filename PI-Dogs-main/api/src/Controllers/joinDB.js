const { apiFn } = require("./temperamentsControllers");
const { getDogs } = require("./dogsControllers");

const joinDB = async () => {
    const dataApi = await apiFn();
    const dataDB = await getDogs();
    const join = dataApi.concat(dataDB);
    return join
}

module.exports = {
    joinDB
}