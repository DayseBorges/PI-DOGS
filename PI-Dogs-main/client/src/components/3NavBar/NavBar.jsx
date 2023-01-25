import React from "react";
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import Filters from "../11Filters/Filters"
 

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.itens}>
        <Link className={styles.links} to={'/home'}><p>Home</p></Link>
        <Link className={styles.links} to={'/form'}><p>Create</p></Link>
        <Link className={styles.links} to={'/about'}><p>About</p></Link>
        <Filters />
      </div>
    </div>
  )
}


export default NavBar;