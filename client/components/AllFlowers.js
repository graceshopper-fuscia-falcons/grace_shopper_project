import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { fetchPlants } from '../store/plants'

export class AllFlowers extends React.Component{
    constructor(){
        super()
    }
    async componentDidMount () {
        const {data} = await this.props.fetchPlants();
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