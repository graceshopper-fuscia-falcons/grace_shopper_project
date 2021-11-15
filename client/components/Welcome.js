import React from 'react'

export default class Welcome extends React.Component {
    render() {
        return (
            <main>
                <div className='WelcomeContainer'>
                    <div className="WelcomeTitleContainer">
                        <div className='WelcomeTitle'>
                            <h1>Welcome {this.props.username}!</h1>
                        </div>
                        <button>Edit My Account</button>
                        <button>View Previous Orders</button>
                    </div>
                </div>
            </main>
        )
    }
}