import NavBar from "../3NavBar/NavBar";
import Cards from "../6Cards/Cards";
import style from "./Home.module.css";
import Paginado from "../10Paginado/Paginado"
import videoHome from "../../videos/videoHome.mp4"
import { useState, useEffect } from "react";
import img from "../../images/loader.gif"

const Home = () => {

    const [loader, setLoader] = useState()
    
    useEffect(() => {
        setLoader(true)
    }, [])

    return ( 
         
            <div className={style.home}>
            { loader ? (
                <>
                <video autoPlay muted loop className={style.video}>
                <source src = {videoHome} type="video/mp4"></source>
                </video>
                <NavBar />
                <Cards />
                <Paginado />
                </>
            ) : (
                <img
                className={style.loader}
                src={img}
                />
            )}
            </div>
        
    )
}

export default Home;