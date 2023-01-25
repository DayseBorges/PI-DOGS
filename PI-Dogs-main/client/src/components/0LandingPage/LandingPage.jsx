import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom';
import LandingVideo from "../../videos/landingVideo.mp4"


const LandingPage = () => {

    return(
        <>
            <div className={styles.back}>
                <video autoPlay muted loop className={styles.video}>
                    <source src = {LandingVideo} type="video/mp4"></source>
                </video>
                <div className={styles.allText}>
                    <h1 className={styles.love}>WE <br /> L<span className={styles.corazon}>❤</span>VE <br /> DOGS!</h1>
                    <h2 className={styles.text}>That's why here you can <br /> find everything about <br /> your best friend</h2>
                    <Link to="/home" >
                    <button className={styles.boton}>see cute</button>
                    </Link> 
                    <Link to="/home" >

                    <button className={styles.boton2}>about</button>
                    </Link>
                </div>
                
            </div>
        </> 
    )
}

export default LandingPage;