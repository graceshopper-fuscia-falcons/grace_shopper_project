// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// export class cartView extends React.Component {
//     constructor() {
//         super();
//         this.handleRemoveItem = this.handleRemoveItem.bind(this);
//         this.handleQuantityChange = this.handleQuantityChange.bind(this);
//     }

//     async componentDidMount() {
//         await this.props.fetchcart();
//     }

//     async componentDidUpdate() {
//         if (prevProps.cart.length !== this.props.cart.length) {
//             await this.props.fetchcart();
//         }
//     }

//     handleRemoveItem() {
//         //Code to remove item from user cart here
//     }

//     handleQuantityChange() {
//         //Code to update quantity of item in cart here
//     }

//     render() {
//         if (this.props.cartItems.length < 1) {
//             return (
//                 <div>Loading...</div>
//             )
//         }
//         return (
//             <main>
//                 <ul>
//                     {this.props.cartItems.map(item => {
//                         return (
//                             <li key={item.id}>{item.name}</li>  //Placeholder Output
//                         )
//                     })}
//                 </ul>
//                 <Link><button>Continue to Checkout</button></Link>
//             </main>
//         )
//     }
// }

// const mapState = (state) => {
//     return {
//         // cartItems: state.cartItems      // Replace .cartItems with cooresponding property name from Redux Store
//     }
// }

// const mapDispatch = (dispatch) => {
//     return {
//         fetchCart: (userId) => dispatch(/*REDUX_FUNCTION_NAME_HERE*/(userId)),
//         removeItem: (userId) => dispatch(/*REDUX_FUNCTION_NAME_HERE*/(userId)),
//         updateItemQuantity: (userId, val) => dispatch(/*REDUX_FUNCTION_NAME_HERE*/(userId, val))
//     }
// }

// export default connect(mapState, mapDispatch)(cartView);