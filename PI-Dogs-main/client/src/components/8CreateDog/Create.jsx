import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getDogs, getTemperaments } from "../../redux/actions";
import style from "./Create.module.css";
import videoCreate from "../../videos/videoCreate.mp4"
import img from "../../images/create.jpg"
import loaderImg from "../../images/loader.gif"


const validate = (input) => {
  let error = {};

  if (!input.name) error.name = "Write something";
  else if (!/^[a-zA-Z\s]*$/.test(input.name) || typeof input.name !== "string") error.name = "Invalid name"
  else if (input.name.length > 30) error.name = "Name must be under 30 characters.";
  if (allNames[input.name]) error.name = "This Breed already exist!";

  if (!input.heightMin) error.heightMin = "";
  else if (!/\d/.test(input.heightMin)) error.heightMin = "Must be a number";
  else if (input.heightMin < 5) error.heightMin = "Must be a minimum height of 5cm";
  else if (input.heightMin > 79) error.heightMin = "Must be a maximum of 89cm";

  if (!input.heightMax) error.heightMax = "";
  else if (!/\d/.test(input.heightMax)) error.heightMax = "Must be a number";
  else if (input.heightMax > 80) error.heightMax = "The height must be a maximum of 80cm";
  else if (input.heightMax < 6) error.heightMax = "The height must be a minimum height of 6cm";

  if (input.heightMin && input.heightMax && parseInt(input.heightMin) >= parseInt(input.heightMax)) 
  error.heightMax = 'Maximum height must be bigger than minimum.'
    
  if (!input.weightMin) error.weightMin = "";
  else if (!/\d/.test(input.weightMin)) error.weightMin = "Must be a number";
  else if (input.weightMin < 1) error.weightMin = "Must be a minimum weight of 1kg";
  else if (input.weightMin > 69) error.weightMin = "Must be a a maximum of 69kg";

  if (!input.weightMax) error.weightMax = "";
  else if (!/\d/.test(input.weightMax)) error.weightMax = "Must be a number";
  else if (input.weightMax > 70) error.weightMax = "The weight must be a maximum of 70kg";
  else if (input.weightMax < 2) error.weightMax = "The weight must be a minimum weight of 2kg";

  if (!input.lifeSpanMin) error.lifeSpanMin = "";
  else if (!/\d/.test(input.lifeSpanMin)) error.lifeSpanMin = "Must be a number";
  else if (input.lifeSpanMin < 5) error.lifeSpanMin = "Must be a minimum life Span of 5 years old";
  else if (input.lifeSpanMin > 19) error.lifeSpanMin = "Must be a maximum of 19 years old";

  else if (!/\d/.test(input.lifeSpanMax)) error.lifeSpanMax = "Must be a number";
  else if (input.lifeSpanMax > 20) error.lifeSpanMax = "Must be a maximum of 20 years old";
  else if (input.lifeSpanMax < 6) error.lifeSpanMax = "Must be minimum life Span of 6 years old";

  if (input.lifeSpanMin && input.lifeSpanMax && parseInt(input.lifeSpanMin) >= parseInt(input.lifeSpanMax)) error.life_span_max = 'Maximum life span must be bigger than minimum.'

  if (input.temperaments.length > 6) error.temperaments = ""

  if (!input.temperaments || input.temperaments.length === 0) error.temperaments = "Please select at least one temperament"

  return error;
}

let allNames = {};

const CreateDog = () => {

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments)
  const dogs = useSelector((state) => state.dogs)
  const history = useHistory()

  const bredFor = Array.from(new Set(dogs.map((breed) => breed.bred_for).join().split(",")));

 
  const [loader, setLoader] = useState()
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    image: img,
    lifeSpanMin: "10",
    lifeSpanMax: "12",
    bred_for: "",
    temperaments: [],
  })

  useEffect(() => {
    if(!allNames.length && dogs.length) 
    dogs.forEach((dog) => { 
      if (!allNames[dog.name]) {
        allNames[dog.name] = true;
      }})
    dispatch(getTemperaments())
    dispatch(getDogs())
    setTimeout(() => {
      setLoader(true)
    }, 1000);
  }, [])

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name] : event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase()
    })
    setError(validate({
      ...input, [event.target.name]: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase()
    }));
  }

  const handleCheck = (event) => {
    setInput({
      ...input,
        bred_for: event.target.value
    })
    setError(validate({
      ...input,
      bred_for: event.target.value
  }))

  }

  const handleSelect = (event) => {
    if (!input.temperaments.includes(event.target.value) && input.temperaments.length < 8)
    setInput({
      ...input,
      temperaments: [...input.temperaments, event.target.value]
    })
    setError(validate({
      ...input,
      temperaments: event.target.value
    }))
  }

  const handleDelete = (element) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temperaments) => temperaments !== element),
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
        if (input.name && !error.name && !error.heightMin && !error.heightMax && !error.weightMin && !error.weightMax && !error.lifeSpanMin && !error.lifeSpanMax && !error.temperaments) {
          dispatch(createDog(input))
          alert('Breed created!')
          setInput({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            image: "",
            lifeSpanMin: "",
            lifeSpanMax: "",
            bred_for: "",
            temperaments: [],
          });
          history.push('/home')
        } else {
          window.alert("Something went wrong, please review!")
     }     
}

    return (
      <div className={style.body}>
        { loader ? (
        <>
        <video autoPlay muted loop className={style.video}>
        <source src = {videoCreate} type="video/mp4"></source>
        </video>

        <Link to= "/home" className={style.buttonBack} >HOME</Link>
        <div className={style.container}>
          
          <form action="">

            <div>
              <label>Name</label>
              <input 
              className={style.inputName}
              type="text" 
              value={input.name}
              name="name"
              onChange={(event) => handleChange(event)}
              />

              {
              error.name && ( <a className={style.warning}>{error.name}</a> )
              }
          
            </div>

            <div className={style.div}>
              <label>Height</label>
              <input 
              className={style.inputHeight}
              type="number" 
              value={input.heightMin}
              name="heightMin"
              placeholder="Min"
              onChange={(event) => handleChange(event)}
              />
              -
              <input 
              className={style.inputHeightMax}
              type="number" 
              value={input.heightMax}
              name="heightMax"
              placeholder="Max"
              onChange={(event) => handleChange(event)}
              />

              {
              error.heightMin && ( <a className={style.warning}>{error.heightMin}</a> )
              }
              {
              error.heightMax && ( <a className={style.warning}>{error.heightMax}</a> )
              }

            </div>

            <div className={style.div}>
              <label>Weight</label>
              <input 
              className={style.inputWeight}
              type="number" 
              value={input.weightMin}
              name="weightMin"
              placeholder="Min"
              onChange={(event) => handleChange(event)}
              />
              -
              <input 
              className={style.inputWeightMax}
              type="number" 
              value={input.weightMax}
              name="weightMax"
              placeholder="Max"
              onChange={(event) => handleChange(event)}
              />

              {
                error.weightMin && ( <a className={style.warning}>{error.weightMin}</a> )
              }
              {
                error.weightMax && ( <a className={style.warning}>{error.weightMax}</a> )
              }

            </div>

            <div className={style.div}>
              <label>Life Span</label>
              <input 
              className={style.inputLife}
              type="number" 
              value={input.lifeSpanMin}
              name="lifeSpanMin"
              placeholder="Min"
              onChange={(event) => handleChange(event)}
              />
              -
              <input 
              className={style.inputLifeMax}
              type="number" 
              value={input.lifeSpanMax}
              name="lifeSpanMax"
              placeholder="Max"
              onChange={(event) => handleChange(event)}
              />

              {
               error.lifeSpanMin && ( <a className={style.warning}>{error.lifeSpanMin}</a> )
              }
              {
                error.lifeSpanMax && ( <a className={style.warning}>{error.lifeSpanMax}</a> )
              }
            
            </div>

            <div>
            <a className={style.a}>Bred For</a>
            <select className={style.selectB} defaultValue='default' name="bredFor" onChange={(event) => handleCheck(event)}>
                <option  hidden selected>Choose one</option>
                {bredFor.map((bredFor) => ( 
                    <option className={style.option}>
                        {bredFor.trim()}
                    </option> 
                ))}
            </select>


            </div>
          
            <div>
            <a className={style.a} >Add eight</a>
            <select className={style.selectT} defaultValue='default' name="temperaments" onChange={handleSelect}>
              <option hidden selected> temperaments </option>

                {temperaments.map((temp) => (
                  <option value={temp.name} key={temp.id}>{temp.name}</option>
                ))}
            </select>
          </div>
            
          </form>

          {input.temperaments.map((temp, id) => (
          <div className={style.temp} key={temp}>
            <a key={id}>{temp}</a>
            <button value={temp} className={style.button} onClick={() => handleDelete(temp)}>x</button>

            {
              error.temperaments && ( <a className={style.warning}>{error.temperaments}</a> )
            }
          </div>

          ))}
        
      
        </div>
        <div className={style.buttonCreate}>
          <button className={style.buttonC} type="submit" onClick={(event) => handleSubmit(event)}>Create Breed</button>
        </div>
        </>
      ) : (
        <img
        className={style.loader}
        src={loaderImg}
        />
        )}
      </div>
    )
  }
  
  
  export default CreateDog;