import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import CartItem from './cartItem';
import ls from 'local-storage';

export class CartView extends React.Component {
    constructor() {
        super();
        this.state = {
            userType: '',
            cart: []
        }
    }

    async componentDidMount() {
        const currentUser = await this.props.fetchMe();
        console.log(currentUser)
        const userType = currentUser ? 'member' : 'guest';
        let cart = [];
        if (userType === 'guest') {
            cart = ls.get('cart');
        } else if (userType === 'member') {
            await this.props.fetchCart(this.props.userId);
            cart = this.props.cart;
            console.log(cart)
        }

        this.setState({
            userType,
            cart
        });
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.cart.length !== this.props.cart.length) {
            const currentUser = await this.props.fetchMe();
            const userType = currentUser ? 'member' : 'guest';
            let cart = [];
            if (userType === 'guest') {
                cart = ls.get('cart');
            } else if (userType === 'member') {
                await this.props.fetchCart(this.props.userId);
                cart = this.props.cart;
            }

            this.setState({
                userType,
                cart
            });
        }
    }

    render() {
        if (this.state.cart < 1) {
            if (this.state.cart.length < 1) {
                return (
                    <div>Empty Cart</div>
                )
            }
        }
        else if (this.state.cart.length < 1) {
            return (
                <div>Loading...</div>
            )
        }

        let totalPrice = 0;
        let totalItems = 0;
        if (this.state.userType === 'guest') {
            return (
                <main>
                    <h1>Shopping Cart</h1>
                    <ul className='cartUL'>
                        {this.state.cart.map(item => {
                            { totalPrice = totalPrice + (item.flower.price * item.quantity) }
                            { totalItems += item.quantity }
                            return (
                                <li key={item.flower.plantId}>
                                    <CartItem userId={this.props.userId} userType={'guest'} item={item} />
                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <h2>Subtotal ({totalItems} items): ${totalPrice / 100}</h2>
                        <Link to='/'><button className='ProceedToCheckoutButton'>Proceed to Checkout</button></Link>
                    </div>
                </main>
            )
        }

        return (
            <main>
                <h1>Shopping Cart</h1>
                <ul className='cartUL'>
                    {this.state.cart.map(item => {
                        { totalPrice = totalPrice + (item.price * item.quantity)}
                        { totalItems += item.quantity }
                        return (
                            <li key={item.plantId}>
                                <CartItem userId={this.props.userId} userType={'member'} item={item} />
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <h2>Subtotal ({totalItems} items): ${totalPrice / 100}</h2>
                    <Link to='/'><button className='ProceedToCheckoutButton'>Proceed to Checkout</button></Link>
                </div>
            </main>
        )
    }
}

const mapState = (state) => {
    return {
        cart: state.cartReducer,
        userId: state.auth.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchCart: (id) => dispatch(fetchCart(id)),
        fetchMe: () => dispatch(me())
    }
}

export default connect(mapState, mapDispatch)(CartView);