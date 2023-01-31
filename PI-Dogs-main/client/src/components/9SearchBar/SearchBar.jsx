import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const history = useHistory()
    
    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            handleSubmit(event)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchName(name));
        setName("");
        history.push("/home")
    }

    return (
        <div className={styles.container}>
            <input 
            className={styles.input} 
            type="text" 
            placeholder="Search..."
            onChange={(event) => handleChange(event)}
            onKeyDown={handleKeyDown}
            />
            <button 
            className={styles.boton}
            type="submit" 
            onClick={(event) => handleSubmit(event)}  
            >🔍︎</button>
        </div>
    )
}

export default SearchBar;