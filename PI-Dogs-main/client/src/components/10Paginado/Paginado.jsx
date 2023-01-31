import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { pageDogs } from "../../redux/actions";
import styles from "./Paginado.module.css";

const Paginado = ({ copyDogs, pageDogs }) => {
  const [dogs, SetChars] = useState(copyDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  let numPages = Math.ceil(dogs.length / dogsPerPage);

  const buttons = [];
  for (let i = 1; i <= numPages; i++) {
    buttons.push(i);
  }

  const handlePrev = () => {
    currentPage === 1
      ? setCurrentPage(currentPage) 
      : setCurrentPage(currentPage - 1)
  };

  const handleNext = () => {
    currentPage === buttons.length
      ? setCurrentPage(currentPage)
      : setCurrentPage(currentPage + 1)
  };

  const start = () => {
    setCurrentPage(1);
  };

  const end = () => {
    setCurrentPage(buttons.length);
  };

  const [currentButtons, setCurrentButtons] = useState([]);

  const handleChange = (start, end) => {
    (!isNaN(start) && !isNaN(end)) && pageDogs(start, end);
  };

  useEffect(() => {
    if (dogs.length !== copyDogs.length) SetChars(copyDogs);
    let templateNumbers = [...currentButtons];

    if (buttons.length < 6) {
      templateNumbers = buttons;
    } else if (currentPage >= 1 && currentPage <= 2) {
      templateNumbers = [1, 2, 3];
    } else if (currentPage > 2 && currentPage < buttons.length - 1) {
      const prevNum = buttons.slice(currentPage - 2, currentPage);
      const nextNum = buttons.slice(currentPage, currentPage + 1);
      templateNumbers = [ ...prevNum, ...nextNum ];
    } else if (currentPage > buttons.length - 3) {
      const sliced = buttons.slice(buttons.length - 1);
      templateNumbers = [ ...sliced ];
    } 
    if (currentPage > numPages){
      start()
    }

    setCurrentButtons(templateNumbers);
    const value = currentPage * dogsPerPage;
    handleChange(value - dogsPerPage, value);
  }, [copyDogs, currentPage, dogsPerPage, numPages]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.paginadoContainer}>
          <ul>
            <li className={`${styles.itens} ${currentPage === 1 ? "disabled" : ""}`}>
            <a className={styles.arrow} onClick={start}>
              ‹‹
              </a>
              <a className={styles.arrow} onClick={handlePrev}>
              ❮
              </a>
            </li>
            {currentButtons.map((data, index) => {
              return (
                <li key={index} className={styles.itens}>
                  <a
                    className={`${currentPage === data ? styles.current : styles.arrow}`}
                    onClick={() => setCurrentPage(data)}
                    >
                    {data}
                  </a>
                </li>
              );
            })}
            <li className={`${styles.itens} ${currentPage === buttons.length ? "disabled" : ""}`}>
              <a className={styles.arrow} onClick={handleNext}>
              ❯
              </a>
              <a className={styles.arrow} onClick={end}>
              ››
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    copyDogs: state.copyDogs,
    dogs: state.dogs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pageDogs: (start, end) => {
      dispatch(pageDogs(start, end));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);