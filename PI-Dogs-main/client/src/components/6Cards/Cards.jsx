import React from 'react';
import Card from "../5Card/Card";
import styles from './Cards.module.css'
import { connect } from 'react-redux'
import { getDogs, getTemperaments } from '../../redux/actions';
import img from "../../images/loader.gif"


class Cards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }
  }


  componentDidMount() {
    
    setTimeout(() => {
      this.props.getDogs();
      this.props.getTemperaments();
      this.setState({ loading: false })
    }, 10);
    
  }


  render() {
    if (this.state.loading)  return (<p>landing...</p> )

    return (
       <div className={styles.cards}>
              {
              [...this.props.pageDogs].map(dog => {
              return (
                <Card
                  id={dog.id}
                  key={dog.id}
                  name={dog.name}
                  image={dog.image}
                  weight={dog.weight}                  
                  temperaments={dog.temperaments}
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
    pageDogs: state.pageDogs,
    temperaments: state.temperaments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: () => dispatch(getDogs()),
    getTemperaments: () => dispatch(getTemperaments()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cards);