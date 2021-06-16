import React, { Component } from 'react'
import classes from './navbar.module.css';
import { Link } from 'react-router-dom'
import { TokenContext } from '../../contexts/TokenContext'
import TokenManager from '../../token/TokenManager'
export class Navbar extends Component {
    static contextType = TokenContext;
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }


    logout() {
        TokenManager.removeToken();
        window.location = "/login";
    }

    render() {
        if (this.context.user_id) {
            return (
                <div className={classes.navbar}>
                    <Link to="/">Home</Link>
                    <Link to="/types">Twoj typy</Link>
                    <Link to="/matches">Mecze</Link>
                    <Link to="/table">Tabela</Link>
                    <Link to="/new-match">Dodaj mecz</Link>
                    <Link to="/matches">Mecze</Link>
                    <button  onClick={this.logout}>Wyloguj</button>
                </div>
            )
        }
        return (
            <div className={classes.navbar}>
                <Link to="/login">Zaloguj</Link>
                <Link to="/register">Stwórz konto</Link>
            </div>
        )
    }
}

export default Navbar
