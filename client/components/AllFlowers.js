import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { fetchPlants } from '../store/plants'
import { Link } from "react-router-dom";

export class AllFlowers extends React.Component{
    constructor(){
        super()
    }
    componentDidMount () {
        const {data} = this.props.fetchPlants();
    }
    render(){
        if(this.props.flowers.length < 1){
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="all-flowers-container">
                {
                    this.props.flowers.map(flowerObj => {
                        return (
                            <div key ={flowerObj.id}>
                                <div>{flowerObj.name}</div>
                                <div>{flowerObj.flowerType}</div>
                                <div>{flowerObj.flowerColor}</div>
                                <img src ={flowerObj.imageUrl}></img>
                                <Link to={`/flowers/${flowerObj.id}`}>View Flower</Link>
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
        flowers: state.plantsReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlants: () => dispatch(fetchPlants())
    }
}

export default connect(mapState, mapDispatch)(AllFlowers)