import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  PAGE_DOGS,
  FILTER_BY_TEMPERAMENTS,
  SEARCH_NAME,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  GET_DETAILS,
  CREATE_DOG,
  DELETE_DOG,
  FILTER_BY_CREATION
  } from "./actions";
  
  const inicialState = {
    pageDogs: [],
    dogs: [],
    details: [],
    copyDogs: [],
    filters: { origin: "allDogs", temperaments: "allDogs"},
    temperaments: [],
  };
  
  const rootReducer = (state = inicialState, action) => {
    let allDogs = state.dogs;

    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: [...action.payload],
          copyDogs: [...action.payload],
        };
  

      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };


      case PAGE_DOGS:
      return {
        ...state,
        pageDogs: [...state.copyDogs.slice(action.payload.start, action.payload.end)],
      };


      case GET_DETAILS:
        return {
          ...state,
          details: action.payload,
        };  
      

      case FILTER_BY_TEMPERAMENTS:
        if (state.filters.origin !== "allDogs") {
          allDogs = action.payload === "Api"
          ? allDogs.filter(dog => !isNaN(dog.id))
          : allDogs.filter(dog => isNaN(dog.id))
        }
        allDogs = action.payload === "allDogs"
        ? allDogs 
        : allDogs.filter(element => element.temperaments?.toUpperCase().includes(action.payload.toUpperCase()));

        return {
          ...state,
          copyDogs: [ ...allDogs ],
          filters: { ...state.filters, temperaments: action.payload }
        }


      case FILTER_BY_CREATION:
        if(state.filters.temperaments !== "allDogs") {
        allDogs = action.payload === "allDogs"
          ? allDogs
          : allDogs.filter(element => element.temperaments?.toUpperCase().includes(action.payload.toUpperCase()));
        } 
        if (action.payload !== "allDogs") {
          allDogs = action.payload === "Api"
          ? allDogs.filter(dog => !isNaN(dog.id))
          : allDogs.filter(dog => isNaN(dog.id))
        } 
        
        return {
          ...state,
          copyDogs: allDogs,
          filters: { ...state.filters, origin: action.payload }
        }
        

      case SEARCH_NAME:
        return {
          ...state,
          copyDogs: [...action.payload],
        }


      case SORT_BY_NAME:
        const sortName = action.payload === "asc"
        ? state.copyDogs.sort((a, b) => {
          return a.name > b.name 
          ? 1
          : a.name < b.name
          ? -1
          : 0;
        })
        : state.copyDogs.sort((a, b) => {
          return a.name > b.name 
          ? - 1
          : a.name < b.name
          ? 1
          : 0;
        })

        return {
          ...state,
          copyDogs: [...sortName], 
        }
       

        case SORT_BY_WEIGHT:
          const sortWeight = action.payload === "asc"
        ? [...state.copyDogs].sort((a, b) => {
          return parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])
          ? 1
          : parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])
          ? -1
          : 0;
        })
        : [...state.copyDogs].sort((a, b) => {
          return parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])
          ? - 1
          : parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])
          ? 1
          : 0;
        })


        return {
          ...state,
          copyDogs:[...sortWeight], 
        }


      case CREATE_DOG:
        return {
          ...state,
          ...action.payload
        };


      case DELETE_DOG:
        return {
          ...state,
          copyDogs: state.copyDogs.filter(dogs => dogs.id.toString() !== action.payload.toString())
        };

      
  
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default rootReducer;