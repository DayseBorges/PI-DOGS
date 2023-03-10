import axios from "axios";
const { REACT_APP_URL_PATH_API } = process.env;

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DETAILS = "GET_DETAILS";
export const PAGE_DOGS = "SET_PAGE_CHARACTER";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const SEARCH_NAME = "SEARCH_NAME";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";
export const DELETE_DOG = "DELETE_DOG";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";


export const getDogs = () => {
  return (dispatch) => {
    fetch(`${REACT_APP_URL_PATH_API}/dogs`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_DOGS, payload: data })
      )
      .catch((error) => {
        // console.log(error);
      })
  };
};


export const getTemperaments = () => {
  return (dispatch) => {
    fetch(`${REACT_APP_URL_PATH_API}/temperaments`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_TEMPERAMENTS, payload: data })
      )
      .catch((error) => {
        // console.log(error);
      })
  };
};

export const pageDogs = (start, end) => {
  return {
    type: PAGE_DOGS,
    payload: { start, end },
  };
};


export const getDetails = (id) => {
  return (dispatch) => {
    fetch(`${REACT_APP_URL_PATH_API}/dogs/${id}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_DETAILS, payload: data }))
      .catch((error) => {
        // console.log(error);
      })
  };
};


export const searchName = (name) => {
  return (dispatch) => {
    fetch(`${REACT_APP_URL_PATH_API}/dogs?name=${name}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: SEARCH_NAME, payload: data })
      )
      .catch((error) => {
        window.alert("Breed not Found!") ;
      })
  };
};


export const filterByTemperament = (payload) => {
  return { type: FILTER_BY_TEMPERAMENTS, payload };
};

export const filterByCreation = (payload) => {
  return { type: FILTER_BY_CREATION, payload };
};


export const sortByName = (payload) => {
  return { type: SORT_BY_NAME, payload };
};


export const orderByWeight = (payload) => {
  return { type: SORT_BY_WEIGHT, payload };
};


export const createDog = (breed) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_URL_PATH_API}/dogs/`, breed)
      // console.log(response.data);
      return dispatch({type: CREATE_DOG, payload: response.data});
    } catch (error) {
      return dispatch({ type: 'CREATE_DOG', payload: error.response.data })
    }
  };
};


export const deleteDog = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`${REACT_APP_URL_PATH_API}/dogs/${id}`)
      return dispatch({ type: DELETE_DOG, payload:response.data })
    } catch (error) {
      return dispatch({ type: DELETE_DOG, payload: error.response.data })
    }
  };
}
