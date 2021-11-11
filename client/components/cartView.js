import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import { fetchPlant } from '../store/singlePlant';
import { removeFromCart } from '../store/users';

export class cartView extends React.Component {
    constructor() {
        super();
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.getCurrentPlantItem = this.getCurrentPlantItem.bind(this);
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

    async getCurrentPlantItem(id) {
        await this.props.fetchPlant(id);
        return;
    }

    async handleRemoveItem(event) {
        if (this.state.userType === 'guest') {
            // Handle remove from local storage here
        } else if (this.state.userType === 'member') {
            await this.props.removeFromCart(this.props.user.id, event.target.name);
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
                        {this.getCurrentPlantItem(item.plantId)}
                        {totalPrice = totalPrice + item.price}
                        return (
                            <li key={item.plantId}>
                                <div className='cartItemView'>
                                    <div className="imageContainer">
                                        <Link to={`/flowers/${item.plantId}`}><img className="ItemPic" src={this.props.currentPlant.imageUrl} /></Link>
                                    </div>
                                    <div className='ItemInfo'>
                                        <h2><Link to={`/flowers/${item.plantId}`}>{this.props.currentPlant.name}</Link></h2>
                                        <h2>${item.price / 100}</h2>
                                        <h4>Qty: {item.quantity}</h4>
                                        <button name={item.plantId} onClick={this.handleRemoveItem}>Remove From Cart</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <h2>Subtotal ({this.props.cart.length} items): ${totalPrice/100}</h2>
                    <Link to='/'><button>Proceed to Checkout</button></Link>
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

export default connect(mapState, mapDispatch)(cartView);