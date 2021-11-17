import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import ls from 'local-storage';
import { addItem, fetchCart } from '../store/cart';
import { addLocalItem } from '../store/LocalCart';

export class SingleFlower extends React.Component {
  constructor() {
    super();
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pictureSwap = this.pictureSwap.bind(this)
    this.state = {
      qty: 1,
      mainImage: ""
    };
  }

  async componentDidMount() {
    const plantId = this.props.match.params.flowersId;
    await this.props.fetchPlant(plantId);
    this.setState({
      qty: 1,
      mainImage: this.props.targetFlower.imageUrl
    })
  }

  handleChange(event) {
    const qty = parseInt(event.target.value);
    this.setState({
      qty
    })
  }

  pictureSwap(event){
    const newImageUrl = event.target.src
    this.setState({
      mainImage: newImageUrl
    })
  }

  async handleAddToCart() {
    const currentUser = await this.props.fetchMe();
    const userType = currentUser ? 'member' : 'guest';
    if (userType === 'guest') {
      let local = ls.get('cart');
      let itemToAdd = {
        plantId: this.props.targetFlower.id,
        price: this.props.targetFlower.price,
        quantity: this.state.qty,
      };
      
      if (local.cart.length < 1) {
        local.cart = [itemToAdd, ...local.cart]
      } else {
        let count = 0;
        for (let i = 0; i < local.cart.length; i++) {
          if (itemToAdd.plantId === local.cart[i].plantId) {
            let updatedItem = local.cart.splice(i, 1)
            updatedItem[0].quantity += this.state.qty;
            local.cart = [updatedItem[0], ...local.cart];
            local.qty += this.state.qty;
            count++;
          }
        }
        if (count === 0) {
          local.cart = [itemToAdd, ...local.cart]
        }
      }
      ls.set('cart', local);
      await this.props.addItemToLocalCart(itemToAdd);
    } else {
      await this.props.addItemToCart(this.props.userId, parseInt(this.props.match.params.flowersId), parseInt(this.state.qty));
      await this.props.fetchCart(this.props.userId)
    }
  }

  render() {
    const { targetFlower } = this.props;
    return (
      <div className="single-plant-container">
          <div className="secondary-image-container">
            <img src={targetFlower.imageUrl} onClick={this.pictureSwap}/>
            <img src={targetFlower.imageUrlsecondary} onClick={this.pictureSwap}/>
          </div>
          <div className="main-image-container">
            <img className="SingleItemPic" src={this.state.mainImage} />
          </div>
          <div className='single-flower-info'>
            <h2>{targetFlower.name}</h2>
            <h1>${targetFlower.price / 100}</h1>
            <p>{targetFlower.description}</p>
            <div className='CartQtySelect'>
              <div className="input-form-container">
                <h4>Quantity:</h4>
                <input
                  id="SingleFlowerQty"
                  type="number"
                  min="1"
                  max="100"                        // Will be Stock value
                  name={targetFlower.id}
                  value={this.state.qty}
                  onChange={this.handleChange}
                />
              </div>
              <button className='AddToCartButton' name={targetFlower.plantId} onClick={this.handleAddToCart}>Add To Bag</button>
            </div>

          </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    targetFlower: state.singlePlantReducer,
    userId: state.auth.id,
    cart: state.cartReducer,
    cart: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
    fetchCart: (id) => dispatch(fetchCart(id)),
    fetchMe: () => dispatch(me()),
    addItemToCart: (userId, plantId, qty) => dispatch(addItem(userId, plantId, qty)),
    addItemToLocalCart: (item) => dispatch(addLocalItem(item))
  };
};

export default connect(mapState, mapDispatch)(SingleFlower);
