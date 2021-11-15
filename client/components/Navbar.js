import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { me } from '../store/auth';
import { fetchCart } from '../store/cart';
import ls from 'local-storage';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      userType: '',
      qty: this.userType === 'member' ? this.props.cart.qty : (ls.get('cart') ? ls.get('cart').qty : 0)
    }
  }

  async componentDidMount() {
    const currentUser = await this.props.fetchMe();
    const userType = currentUser ? 'member' : 'guest';
    let qty = 0
    if (userType === 'guest') {
      qty = ls.get('cart').qty;
    } else if (userType === 'member') {
      await this.props.fetchCart(this.props.userId);
      qty = this.props.cart.qty
    }

    this.setState({
      userType,
      qty
    });
  }

  async componentDidUpdate() {
    if (this.state.qty !== this.props.cart.qty) {
      const currentUser = await this.props.fetchMe();
      const userType = currentUser ? 'member' : 'guest';
      await this.props.fetchCart(this.props.userId);

      let qty = 0
      if (userType === 'guest') {
        qty = ls.get('cart').qty
      } else if (userType === 'member') {
        qty = this.props.cart.qty
      }

      this.setState({
        userType,
        qty
      });
    }
  }

  handleClick() {
    const qty = ls.get('cart').qty
    this.setState({userType: 'guest', qty})
    this.props.logout()
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
                <a href="#" onClick={this.handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div className='LoginOut'>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={this.handleClick}>
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
            {!this.state.qty < 1 ? (
              <div className='CartCounter'>{this.state.qty}</div>
            ) : (<div/>)}
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
    userId: state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: (id) => dispatch(fetchCart(id)),
    fetchMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
