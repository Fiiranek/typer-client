import React, { Component } from 'react'
import {TokenContext} from '../../contexts/TokenContext'
export class Home extends Component {
    static contextType = TokenContext;
    render() {
        console.log(this.context);
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

export default Home
