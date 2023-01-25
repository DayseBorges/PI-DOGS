import NavBar from "../3NavBar/NavBar";
import Cards from "../6Cards/Cards";
import style from "./Home.module.css";
import Paginado from "../10Paginado/Paginado"
import videoHome from "../../videos/videoHome.mp4"

const Home = () => {

    return ( 
        <div className={style.home}>
            <video autoPlay muted loop className={style.video}>
                    <source src = {videoHome} type="video/mp4"></source>
            </video>
            <NavBar />
            <Cards />
            <Paginado />
        </div>
    )
}

export default Home;