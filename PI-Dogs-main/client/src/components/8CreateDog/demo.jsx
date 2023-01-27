// const { Dog, Temperament } = require("../db");
// const { Op } = require("sequelize");
// // const { allDogs } = require("../Controllers/joinDB")


// const getDogs = async () => {
//   const dogs = await Dog.findAll({
//     include:  Temperament,
//   });
//   return dogs;
// };

// const findDogs = async (name) => {
//   let upperName = name.charAt(0).toUpperCase() + name.slice(1);
//   const results = await Dog.findAll({
//     where: {
//       name: { [Op.iLike]: `%${upperName}%` },
//     },
//     include:  Temperament,
//   });
//   if (results.length) return results;
//   else throw Error(`This dog breed was not found: ${name} `);
// };

// const findDogByIdDB = async (id) => {
//   const dogs = await Dog.findByPk(id, {
//     include: [
//       {
//         model: Temperament,
//         as: 'dog_temperament',

//       },
//     ],
//   });
//   console.log(dogs);
//   return dogs;
// };
// const isUUID = (id) => {
//   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
//   return uuidRegex.test(id);
// };
// const findDogById = async (id) => {
//   let dog = [];
//   if (isUUID(id)) {
//     dog = await findDogByIdDB(id);
//     dog = findDogByIdDB([dog]);
//   } else {
//     dog = await findDogByIdDB(id);
//   }
//   if (!dog) throw Error("No data found");
//   return dog;
// };

// const createDog = async ( name, heightMin, heightMax, weightMin, weightMax, lifeSpanMin, lifeSpanMax, image, bred_for, temperaments = []) => {
//   if (!name || !heightMin || !heightMax || !weightMin || !weightMax) throw Error("Mandatory data is missing");

//   const newDog = await Dog.create({
//         name: name[0].toUpperCase() + name.slice(1), 
//         height: `${heightMin} - ${heightMax}`, 
//         weight: `${weightMin} - ${weightMax}`, 
//         lifeSpan: lifeSpanMin && lifeSpanMax ? `${lifeSpanMin} - ${lifeSpanMax} years` : null,
//         image: image ? image : null, 
//         bred_for: bred_for ? bred_for : null,
//   });
//     const pushTemp = await Temperament.findAll({
//       where: {
//         name: { [Op.in]: temperaments },
//       },
//     });
  
//     if (!pushTemp.length) {
//             throw new Error(`Not found : ${temperaments.join(', ')}`)
//     }
//     await newDog.addTemperament(pushTemp);

//     const dogs = await findDogById(newDog.id)
//     return dogs;
// };

// try {
//   // Iniciar una transacción
//   const transaction = await sequelize.transaction();

//   // Validar que el array "temperaments" no esté vacío
//   if (!temperaments.length) {
//       throw new Error("El array de temperamentos no puede estar vacío");
//   }

//   // Crear el nuevo registro de Breed
//   const newBreed = await Breed.create({
//     name: name[0].toUpperCase() + name.slice(1), 
//             height: `${heightMin} - ${heightMax}`, 
//             weight: `${weightMin} - ${weightMax}`, 
//             lifeSpan: lifeSpanMin && lifeSpanMax ? `${lifeSpanMin} - ${lifeSpanMax} years` : null,
//             image: image ? image : null, 
//             bred_for: bred_for ? bred_for : null
//   }, {transaction});

//   // Buscar los registros de Temperament correspondientes
//   const temperamentos = await Temperament.findAll({
//       where: {
//           name: {[Op.in]: temperaments},
//       },
//   }, {transaction});

//   // Validar que se hayan encontrado registros de Temperament
//   if (!temperamentos.length) {
//       throw new Error(`No se encontraron registros de temperamentos con los nombres especificados: ${temperaments.join(', ')}`);
//   }

//   // Establecer la relación "muchos a muchos" entre el nuevo registro de Breed y los registros de Temperament encontrados
//   await newBreed.addTemperament(temperamentos, {transaction});

//   // Commit de la transacción
//   await transaction.commit();
//   return newDog;
// } catch (error) {
//   // Rollback de la transacción en caso de error
// console.error(error);;
// }


// module.exports = {
//   getDogs,
//   createDog,
//   findDogs,
// };






// ************************************************************************************



// import React, { useState, useEffect } from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { postActivities, getCountries } from '../actions/index.js'
// import { useDispatch, useSelector } from 'react-redux';
// import styles from './NewActivity.module.css'

// export function validate(input) {
//     let error = {};

//     if (!input.nombre) {
//         error.nombre = "El nombre es requerido"
//     } else if (!/^[a-zA-Z\s]*$/.test(input.nombre) ||
//         typeof input.nombre !== "string") {
//         error.nombre = "Nombre invalido"
//     }

//     if (!input.dificultad) {
//         error.dificultad = "Debe ingresar una dificultad"
//     } else if (!/\d/.test(input.dificultad)) {
//         error.dificultad = "Debe ser un numero"
//     } else if (input.dificultad < 1 || input.dificultad > 5)
//         error.dificultad = "Debe ser un numero entre 1 y 5"

//     if (!input.duracion) {
//         error.duracion = "Debe ingresar una duracion"
//     } else if (!/\d/.test(input.duracion)) {
//         error.duracion = "Debe ser un numero"
//     } else if (input.duracion < 1 || input.duracion > 24)
//         error.duracion = "Debe ser un numero entre 1 y 24"

//     if (!input.temporada) {
//         error.temporada = "Debe ingresar una temporada"
//     }

//     if (!input.idpais) {
//         error.idpais = "Debe selecccionar un pais"
//     }

//     return error;
// }

// export const NewActivity = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const countries = useSelector((state) => state.countries)
//     const [error, setError] = useState({})
//     // eslint-disable-next-line no-unused-vars
//     const [errorButton, setErrorButton] = useState(
//         Object.values(error).length !== 0 ? true : false
//     );
//     const [input, setInput] = useState({
//         "nombre": "",
//         "dificultad": "",
//         "duracion": "",
//         "temporada": "",
//         "idpais": []
//     })

//     function handleChange(e) {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//         setError(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }))
//     }

//     function handleCheck(e) {
//         setInput({
//             ...input,
//             temporada: e.target.value
//         })
//         setError(validate({
//             ...input,
//             temporada: e.target.value
//         }))
//     }

//     function handleSelect(e) {
//         setInput({
//             ...input,
//             idpais: [...input.idpais, e.target.value]
//         })
//         setError(validate({
//             ...input,
//             idpais: e.target.value
//         }))
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         dispatch(postActivities(input))
//         alert('Actividad creada!!!')
//         setInput({
//             "nombre": "",
//             "dificultad": "",
//             "duracion": "",
//             "temporada": "",
//             "idpais": []
//         })
//         history.push('/home')
//     }

//     function handleDelete(el) {
//         setInput({
//             ...input,
//             idpais: input.idpais.filter(pais => pais !== el)
//         })

//     }

//     useEffect(() => {
//         dispatch(getCountries())
//     }, [dispatch])

//     return (
//         <div className={styles.prevBtn}>
//             <div>
//                 <Link to='/home'>
//                     <button>Volver</button>
//                 </Link>
//             </div>

//             <h1>⛷ 🏂 🏄 Crea tu actividad 🏊 🚴 🧗</h1>

//             <form className={styles.formStyle} onSubmit={(e) => handleSubmit(e)}>
//                 <div>
//                     <label>Nombre de la actividad</label>
//                     <input
//                         type="text"
//                         value={input.nombre}
//                         name="nombre"
//                         onChange={(e) => handleChange(e)}
//                         placeholder="Actividad"
//                     />
//                     {
//                         error.nombre && (
//                             <p className={styles.warning}>{error.nombre}</p>
//                         )
//                     }
//                 </div>

//                 <div>
//                     <label>Dificultad</label>
//                     <input
//                         type="number"
//                         value={input.dificultad}
//                         name="dificultad"
//                         onChange={(e) => handleChange(e)}
//                         placeholder="Entre 1 y 5"
//                     />
//                     {
//                         error.dificultad && (
//                             <p className={styles.warning}>{error.dificultad}</p>
//                         )
//                     }
//                 </div>

//                 <div>
//                     <label>Duracion</label>
//                     <input
//                         type="number"
//                         value={input.duracion}
//                         name="duracion"
//                         onChange={(e) => handleChange(e)}
//                         placeholder="En horas"
//                     />
//                     {
//                         error.duracion && (
//                             <p className={styles.warning}>{error.duracion}</p>
//                         )
//                     }
//                 </div>

//                 <div  className={styles.selectSeason}>
//                     <label>Temporada estacional</label>
//                     {/* "verano", "otoño", "primavera", "invierno" */}
//                     <select onChange={(e) => handleCheck(e)}>
//                         <option
//                             name="verano"
//                             value="verano"
//                         >Verano
//                         </option>

//                         <option
//                             name="otoño"
//                             value="otoño"
//                         >Otoño
//                         </option>

//                         <option
//                             name="primavera"
//                             value="primavera"
//                         >Primavera
//                         </option>

//                         <option
//                             name="invierno"
//                             value="invierno"
//                         >Invierno
//                         </option>
//                     </select>
//                     {
//                         error.temporada && (
//                             <p className={styles.warning}>{error.temporada}</p>
//                         )
//                     }

//                 </div>
//                 <div>
//                     <label>Pais con esa actividad</label>
//                     <select onChange={(e) => handleSelect(e)}>
//                         {countries.map((pais) => (
//                             <option value={pais.id} key={pais.id}>{pais.nombre}</option>
//                         ))}
//                     </select>
//                     {
//                         error.idpais && (
//                             <p className={styles.warning}>{error.idpais}</p>
//                         )
//                     }
//                 </div>
//                 <button
//                     type="submit" className={styles.nextBtn}
//                     disabled={Object.values(error).length !== 0 ? true : false}>
//                     Crear Actividad
//                 </button>
//             </form>
//             {input.idpais.map(el =>
//                 <div key={el} className={styles.borrarPais}>
//                     <p>Pais agregado: {el}</p>
//                     <button onClick={() => handleDelete(el)}>Eliminar</button>
//                 </div>
//             )}
//         </div>
//     )
// }