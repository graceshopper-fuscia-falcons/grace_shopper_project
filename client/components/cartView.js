import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import CartItem from './cartItem';

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
        const userType = currentUser ? 'member' : 'guest';
        let cart = [];
        if (userType === 'guest') {
            /* code to pull data from local storage */
        } else if (userType === 'member') {
            await this.props.fetchCart(this.props.userId);
            cart = this.props.cart;
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
                /* code to pull data from local storage */
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
        if (this.state.cart.length < 1) {
            return (
                <div>Loading...</div>
            )
        }

        let totalPrice = 0;
        return (
            <main>
                <h1>Shopping Cart</h1>
                <ul className='cartUL'>
                    {this.state.cart.map(item => {
                        { totalPrice = totalPrice + item.price }
                        return (
                            <li key={item.plantId}>
                                <CartItem userId={this.props.userId} item={item} />
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <h2>Subtotal ({this.props.cart.length} items): ${totalPrice / 100}</h2>
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