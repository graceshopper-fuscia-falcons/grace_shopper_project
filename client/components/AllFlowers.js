import React from 'react'
import { connect } from "react-redux"
import { fetchPlants } from '../store/plants'
import { fetchPlant } from '../store/singlePlant';
import { Link } from "react-router-dom";
import { me } from '../store/auth';
import ls from 'local-storage';
import { addItem, fetchCart } from '../store/cart';
import { addLocalItem } from '../store/LocalCart';

export class AllFlowers extends React.Component {
    constructor() {
        super();
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    async componentDidMount() {
        await this.props.fetchPlants();
    }
    async handleAddToCart(event) {
        
        const targetId = event.target.name
        await this.props.fetchPlant(event.target.name);
        const currentUser = await this.props.fetchMe();
        const userType = currentUser ? 'member' : 'guest';
        if (userType === 'guest') {
            let local = ls.get('cart');
            let itemToAdd = {
                plantId: this.props.targetFlower.id,
                price: this.props.targetFlower.price,
                quantity: 1,
            };
            if (local.cart.length < 1) {
                local.cart = [itemToAdd, ...local.cart]
            } else {
                let count = 0;
                for (let i = 0; i < local.cart.length; i++) {
                    if (itemToAdd.plantId === local.cart[i].plantId) {
                        let updatedItem = local.cart.splice(i, 1)
                        updatedItem[0].quantity++
                        local.cart = [updatedItem[0], ...local.cart]
                        count++;
                    }
                }
                if (count === 0) {
                    local.cart = [itemToAdd, ...local.cart]
                }
            }
            local.qty++
            ls.set('cart', local)
            await this.props.addItemToLocalCart(itemToAdd);
            return
        } else {
            await this.props.addItemToCart(this.props.userId, targetId, 1);
            await this.props.fetchCart(this.props.userId)
            return
        }
    }
    render() {
        if (this.props.flowers.length < 1) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="all-flowers-container">
                    {
                        this.props.flowers.map(flowerObj => {
                            return (
                                <div className='all-flower-item'key={flowerObj.id}>
                                        <div className="imageContainer">
                                            <Link to={`/flowers/${flowerObj.id}`} style={{textDecoration: "none"}}>
                                            <img className="all-flower-pic" src={flowerObj.imageUrl} />
                                            <h2>{flowerObj.name}</h2>
                                            </Link>
                                        </div>
                                        <div className='ItemInfo'>
                                            <div className="priceInfo">
                                            <h1>${flowerObj.price / 100}</h1>
                                            <button className='AddToCartButton' name={flowerObj.id} onClick={this.handleAddToCart}>Add To Cart</button>
                                            </div>
                                        </div>
                                </div>
                            )
                        })
                    }
            </div>
        )

    }
}

const mapState = (state) => {
    return {
        flowers: state.plantsReducer,
        targetFlower: state.singlePlantReducer,
        userId: state.auth.id,
        cart: state.cartReducer,
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlants: () => dispatch(fetchPlants()),
        fetchCart: (id) => dispatch(fetchCart(id)),
        fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
        fetchMe: () => dispatch(me()),
        addItemToCart: (userId, plantId, qty) => dispatch(addItem(userId, plantId, qty)),
        addItemToLocalCart: (item) => dispatch(addLocalItem(item))
    }
}

export default connect(mapState, mapDispatch)(AllFlowers)