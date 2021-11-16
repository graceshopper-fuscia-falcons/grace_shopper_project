import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart, removeItem, updateQty } from '../store/cart';
import { fetchPlant } from '../store/singlePlant'; 
import CartItem from './cartItem';
import ls from 'local-storage';
import EmptyCart from './EmptyCart'

export class CartView extends React.Component {
    constructor() {
        super();
        if (!ls.get('cart')) {
            ls.set('cart', { cart: [], qty: 0 });
        }
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            userType: '',
            cart: undefined
        }
    }

    async componentDidMount() {
        const currentUser = await this.props.fetchMe();
        const userType = currentUser ? 'member' : 'guest';
        let cart = [];
        if (userType === 'guest') {
            cart = ls.get('cart').cart
        } else if (userType === 'member') {
            await this.props.fetchCart(this.props.userId);
            cart = this.props.cart.cart;
        }
        this.setState({
            userType,
            cart
        });
    }

    async handleRemoveItem(event) {
        const plantId = event.target.name;
        await this.props.fetchPlant(plantId);
        if (this.state.userType === 'guest') {
            let cart = [...this.state.cart.filter(item => item.plantId != plantId)]
            let qty = 0
            for (let i in cart) {
                qty += cart[i].quantity
            }
            ls.set('cart', { cart, qty })
            await this.props.removeFromCart('guest', this.props.targetFlower);
            await this.props.fetchCart('guest')
            cart = this.props.cart.cart
            this.setState({
                userType: this.state.userType,
                cart
            })
        } else if (this.state.userType === 'member') {
            await this.props.removeFromCart(this.props.userId, plantId);
            await this.props.fetchCart(this.props.userId)
            this.setState({
                cart: this.props.cart.cart
            })
        }
    }

    async handleChange(event) {
        const newQty = parseInt(event.target.value);
        const plantId = event.target.name;
        await this.props.fetchPlant(plantId);
        const flower = this.props.targetFlower
        if (this.state.userType == 'guest') {
            let cart = [...this.state.cart.map(item => item.plantId != plantId ? item : { ...item, quantity: newQty })]
            let qty = 0
            for (let i in cart) {
                qty += cart[i].quantity
            }
            ls.set('cart', { cart, qty })
            flower.quantity = newQty
            await this.props.updateQty('guest', flower, newQty)
            await this.props.fetchCart('guest')
            cart = this.props.cart.cart
            this.setState({
                userType: this.state.userType,
                cart
            })
        } else {
            await this.props.updateQty(this.props.userId, plantId, newQty)
            await this.props.fetchCart(this.props.userId)
            this.setState({
                userType: this.state.userType,
                cart: this.props.cart.cart
            })
        }
    }

    render() {
        if (this.state.cart) {
            if (this.state.cart.length < 1) {
                return (
                    <EmptyCart />
                )
            }
        }
        else {
            return (
                <div>Loading...</div>
            )
        }

        let totalPrice = 0;
        let totalItems = 0;
        return (
            <main>
                <div className='CartContainer'>
                    <div className="CartTitleContainer">
                        <div className='CartTitle'>
                            <h1>Shopping Cart</h1>
                        </div>
                    </div>
                    <div className='cartItemsContainer'>
                        <ul className='cartUL'>
                            {this.state.cart.map(item => {
                                { totalPrice = totalPrice + (item.price * item.quantity) }
                                { totalItems += item.quantity }
                                return (
                                    <li key={item.plantId}>
                                        <CartItem handleRemoveItem={this.handleRemoveItem} handleChange={this.handleChange} item={item} isCart={true} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='ProceedToCheckoutContainer'>
                    <h1>Subtotal ({totalItems} items): ${(totalPrice / 100).toFixed(2)}</h1>
                    <Link to='/cart/checkout'><button className='ProceedToCheckoutButton'>Proceed to Checkout</button></Link>
                </div>
            </main>
        )
    }
}

const mapState = (state) => {
    return {
        cart: state.cartReducer,
        userId: state.auth.id,
        targetFlower: state.singlePlantReducer,
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchCart: (id) => dispatch(fetchCart(id)),
        fetchMe: () => dispatch(me()),
        fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
        removeFromCart: (userId, plantId) => dispatch(removeItem(userId, plantId)),
        updateQty: (userId, plantId, newQty) => dispatch(updateQty(userId, plantId, newQty))
    }
}

export default connect(mapState, mapDispatch)(CartView);
