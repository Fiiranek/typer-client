import React, { createContext } from 'react';
import { Component } from 'react';
import TokenManager from '../token/TokenManager'
export const TokenContext = createContext();

export default class TokenContextProvider extends Component {
    state = {
        user_id: TokenManager.getToken(),
        isAdmin: TokenManager.isAdmin()
    }

    render() {
        return (
            <TokenContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </TokenContext.Provider>
        )
    }
}