import React from 'react'

export default class OrderConfirmation extends React.Component {
    render() {
        return (
            <main>
                <div className='CartContainer'>
                    <div className="CartTitleContainer">
                        <div className='CartTitle'>
                            <h1>Your order has been placed Successfully!</h1>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}