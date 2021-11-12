import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

export class SingleFlower extends React.Component {
  constructor() {
    super();
    if (!ls.get('cart')) {
      ls.set('cart', []);
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = {};
  }

  componentDidMount() {
    const plantId = this.props.match.params.flowersId;
    const { data } = this.props.fetchPlant(plantId);
  }

  async handleAddToCart() {
    let getCart = ls.get('cart');
    let itemToAdd = {
      flower: {
        id: this.props.targetFlower.id,
        name: this.props.targetFlower.name,
        price: this.props.targetFlower.price,
      },
      quantity: 1,
    };
    if (getCart.length < 1) {
      getCart.push(itemToAdd);
    } else {
      let count = 0;
      for (let i = 0; i < getCart.length; i++) {
        if (itemToAdd.flower.id === getCart[i].flower.id) {
          getCart[i].quantity++;
          count++;
        }
      }
      if (count === 0) {
        getCart.push(itemToAdd);
      }
    }
    ls.set('cart', getCart);
  }

  render() {
    const { targetFlower } = this.props;
    return (
      <div className="single-plant-container">
        <div>{targetFlower.name}</div>
        <div>{targetFlower.flowerType}</div>
        <div>{targetFlower.flowerColor}</div>
        <img src={targetFlower.imageUrl}></img>
        <button type="button" onClick={() => this.handleAddToCart()}>
          Add To Cart!
        </button>
        <Link to={`/flowers`}>All Flowers</Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    targetFlower: state.singlePlantReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
  };
};

export default connect(mapState, mapDispatch)(SingleFlower);
