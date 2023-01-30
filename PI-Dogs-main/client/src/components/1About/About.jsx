import React from "react";
import styles from "./About.module.css"
import videoDetail from "../../videos/videoDetail.mp4"
import image from "../../images/aboutMi.jpg"
import { Link } from "react-router-dom";

const About = () => {
    return (
      <div>
      <video autoPlay muted loop className={styles.video}>
        <source src = {videoDetail} type="video/mp4"></source>
      </video>
      
      
      <Link to= "/home" className={styles.buttonBack} >HOME</Link>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2 className={styles.name}>Dayse Borges</h2>

          <div className={styles.infos}>

            <div>
            <p className={styles.weightN}>Full Stack Developer</p>
            <h4 className={styles.weight}>Javascript, HTML, CSS, React, Redux, Node.js, Express, Postgres, Sequilize, Figmal, Scrum, Git, GitHub.</h4>
            </div>
            
          </div>
          <p className={styles.tempName}> Bred For </p>
          <h4 className={styles.bredFor}> Program </h4>
          <p className={styles.tempName}>Temperaments</p>
          <h5 className={styles.temp}> Analytical, Continuous learner, Collaborative, Adaptable, Criative, Persistent, Organized. </h5>
        </div>
        <img
          className={styles.img}
          src={image}
          alt="img" />
      </div>
      
    </div>
  );
}
  
  
  export default About;