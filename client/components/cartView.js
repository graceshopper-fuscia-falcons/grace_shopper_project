import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import { fetchPlant } from '../store/singlePlant';
import { removeFromCart } from '../store/users';
import CartItem from './cartItem';

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

    async handleRemoveItem(event) {
        if (this.state.userType === 'guest') {
            // Handle remove from local storage here
        } else if (this.state.userType === 'member') {
            await this.props.removeFromCart(this.props.user.id, event.target.name);
        }
    }

    render() {
        if(this.props.cart){
            if(this.props.cart.length <1){
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
        userId: state.auth.id,
        currentPlant: state.singlePlantReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchCart: (id) => dispatch(fetchCart(id)),
        fetchMe: () => dispatch(me()),
        fetchPlant: (id) => dispatch(fetchPlant(id)),
        removeFromCart: (id, item) => dispatch(removeFromCart(id, item))
    }
}

export default connect(mapState, mapDispatch)(CartView);