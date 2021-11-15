import React from 'react'

export default class EmptyCart extends React.Component {
    render() {
        return (
            <main>
                <div className='CartContainer'>
                    <div className="CartTitleContainer">
                        <div className='CartTitle'>
                            <h1>Your Cart Is Empty</h1>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}