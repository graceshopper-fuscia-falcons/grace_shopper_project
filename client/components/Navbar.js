import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import ls from 'local-storage';

export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      userType: '',
      qty: 0
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

    let qty = 0;
    for (let item in cart) {
      qty += cart[item].quantity;
    }
    this.setState({
      userType,
      qty
    });
  }

  render() {
    return (
      <div className='NavBarContainer'>
        <div className='Logo'></div>
        <h1 className='MainTitle'>Flower Shop</h1>
        <nav>
          <Link to="/flowers"><a>View Our Flowers!</a></Link>
          {this.props.isLoggedIn ? (
            this.props.isAdmin ? (
              <div className='LoginOut'>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <Link to="/users">View Users</Link>
                <a href="#" onClick={this.props.handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div className='LoginOut'>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={this.props.handleClick}>
                  Logout
                </a>
              </div>
            )

          ) : (
            <div className='LoginOut'>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}

          <div className='CartButtonContainer'>
            <Link to="/cart"><div className='CartButton'></div></Link>
            <div className='CartCounter'>{this.state.qty}</div>
          </div>
        </nav>
        <hr />
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    cart: state.cartReducer,
    userId: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: (id) => dispatch(fetchCart(id)),
    fetchMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
