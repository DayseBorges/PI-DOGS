import React from "react";
import style from "./Card.module.css"
import { Link } from "react-router-dom";
import pata from "../../images/pata.png"

const Card = ({ id, name, image, weight, temperaments }) => {

    return (
      
      <div className={style.divCard}>
        <img className={style.img} src={image} alt={name} />
        <div className={style.cardInfo}>
          <img className={style.pata} src={pata} alt={pata} />
          <Link to={`/details/${id}`} className={style.name}>{name}</Link>
          <p className={style.width}>weight {weight}</p>
          <p className={style.temperaments}> <span className={style.nameTemperaments}> Temperament</span> <br /> {temperaments}</p>
        </div>
      </div>
    )
  }
  
  
  export default Card;