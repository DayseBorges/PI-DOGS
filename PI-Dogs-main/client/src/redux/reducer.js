import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_NAME,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  GET_DETAILS,
  CREATE_DOG,
  DELETE_DOG,
  } from "./actions";
  
  const inicialState = {
    dogs: [],
    details: [],
    copyDogs: [],
    temperaments: [],
  };
  
  const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          copyDogs: action.payload,
        };
  
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };

      case GET_DETAILS:
        return {
          ...state,
          details: action.payload,
        };  
      
      case FILTER_BY_TEMPERAMENTS:
        const { payload } = action;
        const copyDogs = state.copyDogs;
        const filterDog = payload === "allDogs" 
        ? copyDogs 
        : copyDogs.filter(element => element.temperaments === payload);

        const filterDogDB = [];
        copyDogs.filter(element => typeof element.id === "string" && 
        element.temperaments.some(temp => temp.name === payload && 
        filterDogDB.push(element)));

        return {
          ...state,
          dogs: [...filterDog, ...filterDogDB]
        }

      case FILTER_BY_NAME:
        return {
          ...state,
          dogs: action.payload,
        }

      case SORT_BY_NAME:
        const sortName = action.payload === "rising"
        ? state.dogs.sort((a, b) => {
          return a.name > b.name 
          ? 1
          : a.name < b.name
          ? -1
          : 0;
        })
        : state.dogs.sort((a, b) => {
          return a.name > b.name 
          ? - 1
          : a.name < b.name
          ? 1
          : 0;
        })

        return {
          ...state,
          dogs: sortName,
        }

        case SORT_BY_WEIGHT:
          const sortWeight = action.payload === "descending"
          ? state.dogs.sort((a, b) => {
             if (a.weight.includes("NaN")) {
                return 1000;
             } else {
              if (parseInt(a.weight.split(" - "))[0] > parseInt(b.weight.split(" - "))[0]) return 1;
              if (parseInt(a.weight.split(" - "))[0] < parseInt(b.weight.split(" - "))[0]) return -1;
              return 0;
             }
          })
          : state.dogs.sort((a, b) => {
              if (a.weight.includes("NaN")) {
                return 1000;
              } else {
                if (parseInt(a.weight.split(" - "))[0] > parseInt(b.weight.split(" - "))[0]) return -1;
                if (parseInt(a.weight.split(" - "))[0] < parseInt(b.weight.split(" - "))[0]) return 1;
                return 0;
              }
          })
  
          return {
            ...state,
            dogs: sortWeight,
          }

      case CREATE_DOG:
        return {
          ...state,
        };

      case DELETE_DOG:
        return {
          ...state,
        };
  
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default rootReducer;