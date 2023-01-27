import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getTemperaments } from "../../redux/actions";
import styles from "./Detail.module.css";
import videoDetail from "../../videos/videoDetail.mp4"

function Details(props) {
  const { id } = props.match.params;
  const dogDetails = useSelector((state) => state.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  console.log(dogDetails);

  return (
    <div>
      <video autoPlay muted loop className={styles.video}>
        <source src = {videoDetail} type="video/mp4"></source>
      </video>
      <Link to= "/home" className={styles.buttonBack} >HOME</Link>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2 className={styles.name}>{dogDetails.name}</h2>
          <div className={styles.infos}>
          <p className={styles.whightN}>Weight</p>
            <h4 className={styles.weight}>{dogDetails.weight} kg</h4>
            <p className={styles.separation}>|</p>
            <p className="itenName">Height</p>
            <h4 className={styles.height}>{dogDetails.height} cm</h4>
            <p className={styles.separation}>|</p>
            <p className="itenName">Life Span</p>
            <h4 className={styles.lifeSpan}>{dogDetails.life_span}</h4>
          </div>
          <p className="itenName">Bred For</p>
          <h4 className={styles.bredFor}> {dogDetails.bred_for}</h4>
          <p className="itenName">Temperaments</p>
          <h5 className={styles.temp}> {dogDetails.temperaments}</h5>
        </div>
        <img
          className={styles.img}
          src={dogDetails.image}
          alt="Not found" />
      </div>{" "}
    </div>
  );
}
export default Details;