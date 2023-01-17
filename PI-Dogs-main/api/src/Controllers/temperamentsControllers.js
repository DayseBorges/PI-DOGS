const { get } = require ("axios");
const { URL, API_KEY } = process.env;


const apiFn = async () => {
    const dogsApi = await get(`${URL}?api_key=${API_KEY}`);
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
}

module.exports = {
    apiFn
}