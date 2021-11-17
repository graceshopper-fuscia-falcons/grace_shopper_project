import React from 'react'
import { connect } from 'react-redux'
import ls from 'local-storage'
import { addItem, fetchCart } from '../store/cart'

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const localCart = ls.get('cart').cart
    for (let item in localCart) {
      await this.props.addItemToCart(this.props.userId, localCart[item].plantId, localCart[item].quantity)
    }
    ls.set('cart', {cart: [], qty: 0})
    await this.props.fetchCart(this.props.userId)
  }

  render() {
    const { username } = this.props.username
    return (
      <main>
        <div className='WelcomeContainer'>
          <div className="WelcomeTitleContainer">
            <div className='WelcomeTitle'>
              <h1>Welcome {username}!</h1>
            </div>
            <button>Edit My Account</button>
            <button>View Previous Orders</button>
          </div>
        </div>
      </main>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    cart: state.cartReducer
  }
}

const mapDispatch = (dispatch) => {
  return {
    addItemToCart: (userId, plantId, qty) => dispatch(addItem(userId, plantId, qty)),
    fetchCart: (id) => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(Home)
