import React from "react";
import style from "./Card.module.css"
// import { Link } from "react-router-dom";

const Card = ({ id, name, image, weight, temperaments }) => {

    return (
      <div className={style.divCard}>
        <p className={style.name}>{name}</p>
        <img className="imgDog" src={image} alt={name} className={style.img}/>
        <p>{weight}</p>
        <p>{temperaments}</p>
      </div>
    )
  }
  
  
  export default Card;