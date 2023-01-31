import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import styles from "./Detail.module.css";
import videoDetail from "../../videos/videoDetail.mp4"
import img from "../../images/loader.gif"

function Details(props) {
  const { id } = props.match.params;
  const dogDetails = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState()

  useEffect(() => {
    setTimeout(() => {
      setLoader(true)
    }, 1000);
    dispatch(getDetails(id));
  }, [dispatch, id]);


  return (
    <div className={styles.body}>
      { loader ? (
        <>
      <video autoPlay muted loop className={styles.video}>
        <source src = {videoDetail} type="video/mp4"></source>
      </video>
      
      
      <Link to= "/home" className={styles.buttonBack} >HOME</Link>
      <div>
        <div className={styles.container}>
          <h2 className={styles.name}>{dogDetails.name}</h2>

          <div className={styles.infos}>

            <div>
            <p className={styles.weightN}>Weight</p>
            <h4 className={styles.weight}>{dogDetails.weight} kg</h4>
            </div>

            <p className={styles.separation}>|</p>

            <div>
              <p className={styles.heightN}>Height</p>
              <h4 className={styles.height}>{dogDetails.height} cm</h4>
            </div>

            <p className={styles.separation}>|</p>

            <div>
              <p className={styles.lifeSpanN}>Life Span</p>
              <h4 className={styles.lifeSpan}>{dogDetails.life_span}</h4>
            </div>

          </div>
          <p className={styles.tempName}>Bred For</p>
          <h4 className={styles.bredFor}> {dogDetails.bred_for}</h4>
          <p className={styles.tempName}>Temperaments</p>
          <h5 className={styles.temp}> {dogDetails.temperaments}</h5>
        </div>
        <img
          className={styles.img}
          src={dogDetails.image}
          alt="Not found" />
      </div>
      </>
      ) : (
        <img
        className={styles.loader}
        src={img}
        />
        )}
    </div>
  );

}
export default Details;