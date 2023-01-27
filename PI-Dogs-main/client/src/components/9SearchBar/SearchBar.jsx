import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchName(name));
        setName("");
    }

    return (
        <div className={styles.container}>
            <input 
            className={styles.input} 
            type="text" 
            placeholder="Search..."
            onChange={(event) => handleChange(event)}
            />
            <button 
            className={styles.boton}
            type="submit" 
            onClick={(event) => handleSubmit(event)}>🔍︎</button>
        </div>
    )
}

export default SearchBar;