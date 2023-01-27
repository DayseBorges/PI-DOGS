import React from "react";
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import Filters from "../11Filters/Filters"
import SearchBar from "../9SearchBar/SearchBar"
 

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.itens}>
        <Link className={styles.links} to={'/home'}><p>Home</p></Link>
        <Link className={styles.links} to={'/create'}><p>Create</p></Link>
        <Link className={styles.links} to={'/about'}><p>About</p></Link>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <Filters />
      </div>
    </div>
  )
}


export default NavBar;