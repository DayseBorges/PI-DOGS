import React from 'react';
import Card from "../5Card/Card";
import styles from './Cards.module.css'
import { connect } from 'react-redux'
import { getDogs } from '../../redux/actions';


class Cards extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getDogs();
  }

  render() {
    return (
       <div className={styles.cards}>
              {
              [...this.props.dogs,...this.props.copyDogs].map(dog => {
              return (
                <Card
                  name={dog.name}
                  weight={dog.species}
                  temperaments={dog.gender}
                  image={dog.image}
                  id={dog.id}
                />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
    copyDogs: state.copyDogs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: () => dispatch(getDogs()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cards);