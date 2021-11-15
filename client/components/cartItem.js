import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlant } from '../store/singlePlant';

export class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            plant: {},
            plantId: undefined,
            price: undefined,
            qty: undefined
        }
    }

    async componentDidMount() {
        await this.props.fetchPlant(this.props.item.plantId);
        this.setState({
            plant: this.props.plant,
            plantId: this.props.item.plantId,
            price: this.props.item.price,
            qty: this.props.item.quantity
        })
    }

    async componentDidUpdate() {
        if (this.props.item.plantId != this.state.plantId) {
            await this.props.fetchPlant(this.props.item.plantId);
            this.setState({
                plant: this.props.plant,
                plantId: this.props.item.plantId,
                price: this.props.item.price,
                qty: this.props.item.quantity
            })
        }
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
                    <h1>${this.state.price / 100}</h1>
                    {this.props.isCart === true ? (
                        <div className='CartQtySelect'>
                            <div className="label">
                                <h4>Qty: </h4>
                            </div>
                            <input
                                id="qty"
                                type="number"
                                min="0"
                                max="100"                        // Will be stock
                                name={this.state.plantId}
                                value={item.quantity}
                                onChange={this.props.handleChange}
                            ></input>
                            <div className='divider'>|</div>
                            <div className='buttonContainer'>
                                <button className='RemoveFromCartButton' name={this.state.plantId} onClick={this.props.handleRemoveItem}>Remove From Cart</button>
                            </div>
                        </div>
                    ) : (
                        <h4>Qty: {item.quantity}</h4>
                    )}


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
        // removeFromCart: (id, item) => dispatch(removeFromCart(id, item))
    }
}

export default connect(mapState, mapDispatch)(CartItem);
