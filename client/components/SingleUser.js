import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { fetchUser } from '../store/singleUser'
import { Link } from 'react-router-dom'

export class SingleUser extends React.Component {
    constructor(){
        super()
        this.state = {
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        const {data} = this.props.getUser(userId);
    }

    render(){
        console.log(this.props)
       const {targetUser} = this.props
        return (
          <div key ={targetUser.id}>
          <div>Username: {targetUser.username}</div>
           <div>Password: {targetUser.password}</div>
          <div>isAdmin: {targetUser.isAdmin}</div>
          <div>Cart: {targetUser.cart}</div>
          <div>Email: {targetUser.email}</div>
          <Link to={`/users`}>All Users</Link>
      </div>
        )
    }
}

const mapState = (state) => {
    return {
        targetUser: state.singleUserReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: (userId) => dispatch(fetchUser(userId))
    }
}

export default connect(mapState, mapDispatch)(SingleUser)
