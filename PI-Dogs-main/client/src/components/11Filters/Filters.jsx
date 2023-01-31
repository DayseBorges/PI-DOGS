import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByTemperament, filterByCreation, sortByName, orderByWeight } from '../../redux/actions';
import style from "./Filters.module.css"



export default function Filters() {

    const dispatch = useDispatch();
    const [currentPageOrder, setCurrentPageOrder] = useState(1);
    const [order, setOrder] = useState('')

    function handleTemperament(event) {
        event.preventDefault();
        dispatch(filterByTemperament(event.target.value))
    };

    const temperaments = useSelector((state) => state.temperaments)?.sort(
      function (a, b) {
          if (a < b) return -1;
          else return 1;
      }
    );

    function handleOrder(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPageOrder(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleOrderWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPageOrder(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleCreated(event) {
        dispatch(filterByCreation(event.target.value))
    };


    
    return (
        <div className={style.container}>

                <select onChange={(event) => handleCreated(event)} >
                    <option value="allDogs">Dogs</option>
                    <option value="Created">My Dogs</option>
                    <option value="Api">Api Dogs</option>
                </select>

                <select className={style.temp} onChange={(event) => handleTemperament(event)}>
                        <option value="allDogs">Temperaments</option>
                        {temperaments.map((temp) => {
                            return (
                                <option value={temp.name} key={temp.id}>
                                    {temp.name}
                                </option>
                            );
                        })}
                </select>
  

                <select onChange={(event) => handleOrder(event)} >
                    <option hidden selected> Sort By Name </option>
                    <option value='asc'> Sort A - Z </option>
                    <option value='dec'> Sort Z - A </option>
                </select>



                <select onChange={(event) => handleOrderWeight(event)} >
                    <option hidden selected>  Weight Sort </option>
                    <option value='asc'>Rising Weight</option>
                    <option value='dec'>Decreasing Weight</option>
                </select>

            
        </div>
    );
};