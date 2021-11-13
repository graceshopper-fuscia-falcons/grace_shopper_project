import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import ls from 'local-storage';
import { addItem } from '../store/cart';

export class SingleFlower extends React.Component {
  constructor() {
    super();
    if (!ls.get('cart')) {
      ls.set('cart', []);
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      qty: undefined
    };
  }

  async componentDidMount() {
    const plantId = this.props.match.params.flowersId;
    await this.props.fetchPlant(plantId);
    this.setState({
      qty: 1
    })
  }

  handleChange(event) {
    const qty = parseInt(event.target.value);
    this.setState({
      qty
    })

  }

  async handleAddToCart() {
    const currentUser = await this.props.fetchMe();
    const userType = currentUser ? 'member' : 'guest';
    if (userType === 'guest') {
      let getCart = ls.get('cart');
      let itemToAdd = {
        plantId: this.props.targetFlower.id,
        price: this.props.targetFlower.price,
        quantity: this.state.qty,
      };
      if (getCart.length < 1) {
        getCart = [itemToAdd, ...getCart]
      } else {
        let count = 0;
        for (let i = 0; i < getCart.length; i++) {
          if (itemToAdd.plantId === getCart[i].plantId) {
            let updatedItem = getCart.splice(i, 1)
            updatedItem[0].quantity += this.state.qty;
            getCart = [updatedItem[0], ...getCart]
            count++;
          }
        }
        if (count === 0) {
          getCart = [itemToAdd, ...getCart]
        }
      }
      ls.set('cart', getCart);
    } else {
      console.log(this.state.qty)
      await this.props.addItemToCart(this.props.userId, parseInt(this.props.match.params.flowersId), parseInt(this.state.qty));
    }
  }

  render() {

    const { targetFlower } = this.props;
    return (
      <div className="single-plant-container">
        <div className='cartItemView'>
          <div className="imageContainer">
            <img className="SingleItemPic" src={targetFlower.imageUrl} />
          </div>
          <div className='SingleItemInfo'>
            <h2><Link to={`/flowers/${targetFlower.id}`}>{targetFlower.name}</Link></h2>
            <h1 className='SingleFlowerName'>${targetFlower.price / 100}</h1>
            <div className='CartQtySelect'>
              <div className="label">
                <h4>Qty: </h4>
              </div>
              <input
                id="SingleFlowerQty"
                type="number"
                min="0"
                max="100"                        // Will be stock
                name={targetFlower.id}
                value={this.state.qty}
                onChange={this.handleChange}
              ></input>
              <div className='divider'>|</div>
              <div className='buttonContainer'>
                <button className='AddToCartButton' name={targetFlower.plantId} onClick={this.handleAddToCart}>Add To Cart</button>
              </div>
            </div>

          </div>
        </div>
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
    fetchMe: () => dispatch(me()),
    addItemToCart: (userId, plantId, qty) => dispatch(addItem(userId, plantId, qty))
  };
};

export default connect(mapState, mapDispatch)(SingleFlower);
