import React, { Component } from 'react'
import classes from './navbar.module.css';
import { Link } from 'react-router-dom'
import { TokenContext } from '../../contexts/TokenContext'
import TokenManager from '../../token/TokenManager'
import Logo from '../../assets/logo.png'
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
        if (this.context.user_id && this.context.isAdmin) {
            return (
                <div className={classes.navbar}>
                    {/*<img className={classes.logo} src={Logo} alt=""/>*/}
                    <Link to="/">Home</Link>
                    <Link to="/types">Typy</Link>
                    <Link to="/matches">Mecze</Link>
                    <Link to="/table">Tabela</Link>
                    <Link to="/new-match">Dodaj mecz</Link>
                    <button onClick={this.logout}>Wyloguj</button>
                </div>
            )
        }
        else if (this.context.user_id && !this.context.isAdmin) {
            return (
                <div className={classes.navbar}>
                    <Link to="/">Home</Link>
                    <Link to="/types">Typy</Link>
                    <Link to="/matches">Mecze</Link>
                    <Link to="/table">Tabela</Link>
                    <button onClick={this.logout}>Wyloguj</button>
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
