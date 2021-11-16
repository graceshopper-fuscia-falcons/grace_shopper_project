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
      let updatedItem = [itemToAdd]
      if (local.cart.length < 1) {
        local.cart = [itemToAdd, ...local.cart]
      } else {
        let count = 0;
        for (let i = 0; i < local.cart.length; i++) {
          if (itemToAdd.plantId === local.cart[i].plantId) {
            updatedItem = local.cart.splice(i, 1)
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
      await this.props.addItemToCart('guest', updatedItem[0], parseInt(this.state.qty));
    } else {
      await this.props.addItemToCart(this.props.userId, parseInt(this.props.match.params.flowersId), parseInt(this.state.qty));
    }
  }

  render() {
    const { targetFlower } = this.props;
    return (
      <div className="single-plant-container">
        <div className='cartItemView'>
          <div className="secondaryImageContainer">
            <img style={{width: 150}}src={targetFlower.imageUrl} onClick={this.pictureSwap}/>
            <img style={{width: 150}}src={targetFlower.imageUrlsecondary} onClick={this.pictureSwap}/>
          </div>
          <div className="imageContainer">
            <img className="SingleItemPic" src={this.state.mainImage} />
          </div>
          <div className='SingleItemInfo'>
            <h2><Link to={`/flowers/${targetFlower.id}`}>{targetFlower.name}</Link></h2>
            <p className="description">{targetFlower.description}</p>
            <h1 className='SingleFlowerName'>${targetFlower.price / 100}</h1>
            <div className='CartQtySelect'>
              <div className="label">
                <h4>Qty: </h4>
              </div>
              <input
                id="SingleFlowerQty"
                type="number"
                min="0"
                max="100"                        // Will be Stock value
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
    userId: state.auth.id,
    cart: state.cartReducer,
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
