import React from 'react'
import { connect } from "react-redux"
import { fetchPlants } from '../store/plants'
import { fetchPlant } from '../store/singlePlant';
import { Link } from "react-router-dom";
import { me } from '../store/auth';
import ls from 'local-storage';
import { addItem } from '../store/cart';

export class AllFlowers extends React.Component {
    constructor() {
        super();
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    async componentDidMount() {
        await this.props.fetchPlants();
    }
    async handleAddToCart(event) {
        const targetId = event.target.name
        await this.props.fetchPlant(event.target.name);
        const currentUser = await this.props.fetchMe();
        const userType = currentUser ? 'member' : 'guest';
        if (userType === 'guest') {
            let local = ls.get('cart');
            let itemToAdd = {
                plantId: this.props.targetFlower.id,
                price: this.props.targetFlower.price,
                quantity: 1,
            };
            if (local.cart.length < 1) {
                local.cart = [itemToAdd, ...local.cart]
            } else {
                let count = 0;
                for (let i = 0; i < local.cart.length; i++) {
                    if (itemToAdd.plantId === local.cart[i].plantId) {
                        let updatedItem = local.cart.splice(i, 1)
                        updatedItem[0].quantity++
                        local.cart = [updatedItem[0], ...local.cart]
                        count++;
                    }
                }
                if (count === 0) {
                    local.cart = [itemToAdd, ...local.cart]
                }
            }
            local.qty++
            ls.set('cart', local);
        }
        else {
            await this.props.addItemToCart(this.props.userId, targetId, 1);
        }
    }
    render() {
        if (this.props.flowers.length < 1) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-5">
                    {
                        this.props.flowers.map(flowerObj => {
                            return (
                                <div className='all-flower-item'key={flowerObj.id}>
                                        <div className="imageContainer">
                                            <Link to={`/flowers/${flowerObj.id}`}><img className="all-flower-pic w-60" src={flowerObj.imageUrl} /></Link>
                                        </div>
                                        <div className='ItemInfo'>
                                            <h2 className="text-3xl font-semibold text-gray-800 uppercase"><Link to={`/flowers/${flowerObj.id}`}>{flowerObj.name}</Link></h2>
                                            <h1 className="text-yellow-700">${flowerObj.price / 100}</h1>
                                            <button className='px-4 py-1 rounded-lg bg-green-800 hover:bg-green-400 hover:-translate-y-0.5 transform transition text-white mt-1 uppercase tracking-wider font-semibold text-sm' name={flowerObj.id} onClick={this.handleAddToCart}>Add To Cart</button>
                                            <div className='CartQtySelect'>
                                            </div>
                                    </div>
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
        flowers: state.plantsReducer,
        targetFlower: state.singlePlantReducer,
        userId: state.auth.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlants: () => dispatch(fetchPlants()),
        fetchPlant: (plantId) => dispatch(fetchPlant(plantId)),
        fetchMe: () => dispatch(me()),
        addItemToCart: (userId, plantId, qty) => dispatch(addItem(userId, plantId, qty))
    }
}

export default connect(mapState, mapDispatch)(AllFlowers)