import React from 'react';
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

  async componentDidMount() {
    const plantId = this.props.match.params.flowersId;
    await this.props.fetchPlant(plantId);
  }

  async handleAddToCart() {
    const currentUser = await this.props.fetchMe();
    const userType = currentUser ? 'member' : 'guest';
    if (userType === 'guest') {
      let getCart = ls.get('cart');
      let itemToAdd = {
        plantId: this.props.targetFlower.id,
        price: this.props.targetFlower.price,
        quantity: 1,
      };
      if (getCart.length < 1) {
        getCart = [itemToAdd, ...getCart]
      } else {
        let count = 0;
        for (let i = 0; i < getCart.length; i++) {
          if (itemToAdd.plantId === getCart[i].plantId) {
            let updatedItem = getCart.splice(i, 1)
            updatedItem[0].quantity++
            getCart = [updatedItem[0], ...getCart]
            count++;
          }
        }
        if (count === 0) {
          getCart = [itemToAdd, ...getCart]
        }
      }
      ls.set('cart', getCart);
    }


  }

  render() {
    console.log(ls.get('cart'))
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
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
    fetchMe: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(SingleFlower);
