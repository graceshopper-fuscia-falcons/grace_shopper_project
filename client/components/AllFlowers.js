import React from 'react'
import { connect } from "react-redux"
import { fetchPlants } from '../store/plants'
import { fetchPlant } from '../store/singlePlant';
import { Link } from "react-router-dom";
import { me } from '../store/auth';
import ls from 'local-storage';

export class AllFlowers extends React.Component {
    constructor() {
        super();
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    async componentDidMount() {
        await this.props.fetchPlants();
    }
    async handleAddToCart(event) {
        await this.props.fetchPlant(event.target.name);
        const currentUser = await this.props.fetchMe();
        const userType = currentUser ? 'member' : 'guest';
        if (userType === 'guest') {
            let getCart = ls.get('cart');
            let itemToAdd = {
                plantId: this.props.targetFlower.id,
                price: this.props.targetFlower.price,
                quantity: 1,
            };
            if (getCart.length < 1) {
                getCart = [itemToAdd, ...getCart]
            } else {
                let count = 0;
                for (let i = 0; i < getCart.length; i++) {
                    if (itemToAdd.plantId === getCart[i].plantId) {
                        let updatedItem = getCart.splice(i, 1)
                        updatedItem[0].quantity++
                        getCart = [updatedItem[0], ...getCart]
                        count++;
                    }
                }
                if (count === 0) {
                    getCart = [itemToAdd, ...getCart]
                }
            }
            ls.set('cart', getCart);
        }
    }
    render() {
        if (this.props.flowers.length < 1) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="all-flowers-container">
                <ul className='AllFlowersUL'>
                    {
                        this.props.flowers.map(flowerObj => {
                            return (
                                <li key={flowerObj.id}>
                                    <div className='cartItemView'>
                                        <div className="imageContainer">
                                            <Link to={`/flowers/${flowerObj.id}`}><img className="ItemPic" src={flowerObj.imageUrl} /></Link>
                                        </div>
                                        <div className='ItemInfo'>
                                            <h2><Link to={`/flowers/${flowerObj.id}`}>{flowerObj.name}</Link></h2>
                                            <h1>${flowerObj.price / 100}</h1>
                                            <div className='CartQtySelect'>
                                                <div className='buttonContainer'>
                                                    <button className='AddToCartButton' name={flowerObj.id} onClick={this.handleAddToCart}>Add To Cart</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )

    }
}

const mapState = (state) => {
    return {
        flowers: state.plantsReducer,
        targetFlower: state.singlePlantReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlants: () => dispatch(fetchPlants()),
        fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
        fetchMe: () => dispatch(me())
    }
}

export default connect(mapState, mapDispatch)(AllFlowers)