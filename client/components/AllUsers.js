import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { fetchUsers } from '../store/users'
import { Link } from "react-router-dom";

export class AllUsers extends React.Component{
    constructor(){
        super()
    }
    componentDidMount () {
        const {data} = this.props.getUsers();
    }
    render(){
        if(this.props.users.length < 1){
            return (
                <h1>Loading users for you the admin...</h1>
            )
        }
        return (
            <div className="all-flowers-container">
                {
                    this.props.users.map(user => {
                        return (
                            <div key ={user.id}>
                                <div>{user.username}</div>
                                {/* <div>{user.password}</div>
                                <div>{user.isAdmin}</div>
                                <div>{user.cart}</div>
                        <div>{user.email}</div> */ }
                                <Link to={`/users/${user.id}`}>Details</Link>
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}

const mapState = (state) => {
    return {
        users: state.usersReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapState, mapDispatch)(AllUsers)
