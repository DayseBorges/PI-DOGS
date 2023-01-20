import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";
export const DELETE_DOG = "DELETE_DOG";
export const CREATE_DOG = "CREATE_DOG";


export const getDogs = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/dogs")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_DOGS, payload: data })
      );
  };
};


export const getTemperaments = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/temperaments")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_TEMPERAMENTS, payload: data })
      );
  };
};


export const getDetails = (id) => {
  return (dispatch) => {
    fetch(`http//localhost:3001/dogs/${id}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_DETAILS, payload: data }))
  };
};


export const filterByName = (name) => {
  return (dispatch) => {
    fetch(`http//localhost:3001/dogs?name=${name}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: FILTER_BY_NAME, payload: data })
      );
  };
};


export const filterByTemperament = (payload) => {
  return { type: FILTER_BY_TEMPERAMENTS, payload };
};


export const orderByName = (payload) => {
  return { type: SORT_BY_NAME, payload };
};


export const orderByWeight = (payload) => {
  return { type: SORT_BY_WEIGHT, payload };
};


export const createdog = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("http//localhost:3001/dogs", payload)
      return dispatch({ type: CREATE_DOG, payload:response.data })
    } catch (error) {
      return dispatch({ type: CREATE_DOG, payload: error.response.data })
    }
  };
};


export const deleteDog = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`http//localhost:3001/dogs/${id}`)
      return dispatch({ type: DELETE_DOG, payload:response.data })
    } catch (error) {
      return dispatch({ type: DELETE_DOG, payload: error.response.data })
    }
  };
}


// export const searchCharacters = () => {
//   return function (dispatch) {
//     fetch("https://rickandmortyapi.com/api/character")
//       .then((response) => response.json())
//       .then((data) =>
//         dispatch({ type: GET_CHARACTERS, payload: data.results } ))
//       .catch(console.log(error));
      
//   };
// };

// export const getDetails = (id) => {
//   return function (dispatch) {
//     fetch(`https://rickandmortyapi.com/api/character/${id}`)
//       .then((response) => response.json())
//       .then((data) =>
//         dispatch({ type: GET_DETAILS, payload: data })
//       );
//   };
// };
// export function getDetails(id) {
//   return async function (dispatch) {
//     try {
//       var response = await axios.get(
//         `https://rickandmortyapi.com/api/character/${id}`
//       );
//       console.log(response.data);
//       return dispatch({
//         type: GET_DETAILS,
//         payload: response.data,
//       });
//     } catch (error) {
//       window.alert("error");
//     }
//   };
// }