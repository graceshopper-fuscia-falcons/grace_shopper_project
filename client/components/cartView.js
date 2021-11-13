import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import CartItem from './cartItem';
import ls from 'local-storage';

export class CartView extends React.Component {
    constructor() {
        super();
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.state = {
            userType: '',
            cart: []
        }
    }

    async componentDidMount() {
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

    // async componentDidUpdate(prevProps, prevState) {
    //     console.log('prevState',prevState)
    //     console.log('state',this.state.cart)
    //     if (prevProps.cart.length !== this.props.cart.length || prevState.cart.length !== this.state.cart.length) {
    //         const currentUser = await this.props.fetchMe();
    //         const userType = currentUser ? 'member' : 'guest';
    //         let cart = [];
    //         if (userType === 'guest') {
    //             cart = ls.get('cart');
    //         } else if (userType === 'member') {
    //             await this.props.fetchCart(this.props.userId);
    //             cart = this.props.cart;
    //         }

    //         this.setState({
    //             userType,
    //             cart
    //         });
    //     }
    // }

    async handleRemoveItem(event) {
        if (this.state.userType === 'guest') {
            // Handle remove from local storage here
            let cart = this.state.cart;
            cart = [...cart.filter(item => item.flower.id != event.target.name)]
            ls.set('cart', cart)
            this.setState({
                userType: this.state.userType,
                cart
            })
        } else if (this.state.userType === 'member') {
            await this.props.removeFromCart(this.props.user.id, event.target.name);
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
                                    <CartItem userId={this.props.userId} handleRemoveItem={this.handleRemoveItem} userType={'guest'} item={item} />
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
                        { totalPrice = totalPrice + (item.price * item.quantity) }
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