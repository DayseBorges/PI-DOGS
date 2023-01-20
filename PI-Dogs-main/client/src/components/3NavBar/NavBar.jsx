import React from "react";
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
 

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.itens}>
        <Link className={styles.links} to={'/home'}><p>Home</p></Link>
        <Link className={styles.links} to={'/form'}><p>Create Character</p></Link>
      </div>
    </div>
  )
}


export default NavBar;