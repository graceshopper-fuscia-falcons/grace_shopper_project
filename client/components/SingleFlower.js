import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { fetchPlant } from '../store/singlePlant'
import { Link } from 'react-router-dom'

export class SingleFlower extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount() {
        const plantId = this.props.match.params.flowersId
        const {data} = this.props.fetchPlant(plantId);
    }

    render(){
       const  {targetFlower} = this.props
        return (
            <div className="single-plant-container">
                <div>{targetFlower.name}</div>
                <div>{targetFlower.flowerType}</div>
                <div>{targetFlower.flowerColor}</div>
                <img src ={targetFlower.imageUrl}></img>
                <button>Add To Cart!</button>
                <Link to={`/flowers`}>All Flowers</Link>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        targetFlower: state.singlePlantReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlant: (plantId) => dispatch(fetchPlant(plantId))
    }
}

export default connect(mapState, mapDispatch)(SingleFlower)
