import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const { username } = props

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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
