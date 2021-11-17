import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { me } from '../store/auth';
import ls from 'local-storage'

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    this.props.logout()
  }

  render() {
    const qty = this.props.userId ? this.props.cart.qty : (ls.get('cart') ? ls.get('cart').qty : 0)
    return (
      <div className='navbar-outer'>
        <div className='NavBarContainer'>
          <img src='/Media/logo.png' />
          <nav>
            {this.props.isLoggedIn ? (
              this.props.isAdmin ? (
                <div className='LoginOut'>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">Home</Link>
                  <Link to="/flowers"><span>Flowers</span></Link>
                  <Link to="/users">Users</Link>
                  <a href="#" onClick={this.handleClick}>
                    Logout
                  </a>
                </div>
              ) : (
                <div className='LoginOut'>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">Home</Link>
                  <Link to="/flowers"><span>Flowers</span></Link>
                  <a href="#" onClick={this.handleClick}>
                    Logout
                  </a>
                </div>
              )

              ) : (
                <div className='LoginOut'>
                {/* The navbar will show these links before you log in */}
                <Link to="/flowers"><span>Flowers</span></Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}

            <div className='CartButtonContainer'>
              <Link to="/cart" style={{textDecoration:"none"}}>
                  <img src= '/Media/bag.png' />
                <div className='CartCounter'><p>{qty}</p></div>
                </Link>
            </div>
          </nav>
        </div>
        <div className='nav-line'>
          <hr></hr>
        </div>
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
    localCart: state.localCartReducer,
    userId: state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
