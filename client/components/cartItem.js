import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlant } from '../store/singlePlant';


export class CartItem extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            plant: {},
            plantId: undefined,
            price: undefined,
            qty: undefined
        }
    }

    async componentDidMount() {
        const plantId = this.props.userType === 'guest' ? this.props.item.flower.id : this.props.item.plantId;
        const price = this.props.userType === 'guest' ? this.props.item.flower.price : this.props.item.price;
        await this.props.fetchPlant(plantId);
        this.setState({
            plant: this.props.plant,
            plantId: plantId,
            price,
            qty: this.props.item.quantity
        })
    }

    // async handleRemoveItem(event) {
    //     if (this.state.userType === 'guest') {
    //         // Handle remove from local storage here
    //     } else if (this.state.userType === 'member') {
    //         await this.props.removeFromCart(this.props.user.id, event.target.name);
    //     }
    // }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (!this.state.plant) {
            return (
                <div>Loading...</div>
            )
        }

        const item = this.props.item;
        return (
            <div className='cartItemView'>
                <div className="imageContainer">
                    <Link to={`/flowers/${this.state.plantId}`}><img className="ItemPic" src={this.state.plant.imageUrl} /></Link>
                </div>
                <div className='ItemInfo'>
                    <h2><Link to={`/flowers/${this.state.plantId}`}>{this.state.plant.name}</Link></h2>
                    <h2>${this.state.price / 100}</h2>
                    <div className='CartQtySelect'>
                        <div className="label">
                            <h4>Qty: </h4>
                        </div>
                        <input
                            id="qty"
                            type="number"
                            min="0"
                            max="10"                        // Will be stock
                            name="qty"
                            value={item.quantity}
                            onChange={this.handleChange}
                        ></input>
                    </div>
                    <div className='buttonContainer'>
                        <button className='RemoveFromCartButton' name={this.state.plantId} onClick={this.handleRemoveItem}>Remove From Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        plant: state.singlePlantReducer
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPlant: (id) => dispatch(fetchPlant(id)),
        removeFromCart: (id, item) => dispatch(removeFromCart(id, item))
    }
}

export default connect(mapState, mapDispatch)(CartItem);