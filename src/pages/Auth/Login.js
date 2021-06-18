import React, { Component, createRef } from 'react'
import { MESSAGE, SERVER_URL } from '../../constans/constans';
import classes from './auth.module.css'
import TokenManager from '../../token/TokenManager';
import { TokenContext } from '../../contexts/TokenContext'
import Logo from '../../assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Login extends Component {
    static contextType = TokenContext;
    constructor() {
        super();
        this.nickRef = createRef();
        this.passwordRef = createRef();
        this.login = this.login.bind(this);
        this.isLoginInfoValid = this.isLoginInfoValid.bind(this);
    }

    isLoginInfoValid(nick, p) {
        if (p.length < 5) return false;
        if (nick.length < 5) return false;
        return true;
    }

    login() {
        const nick = this.nickRef.current.value;
        const password = this.passwordRef.current.value;
        const isValid = this.isLoginInfoValid(nick, password);
        if (isValid) {
            fetch(`${SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nick, password })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.msg === MESSAGE.SUCCESS) {

                        this.notify("Logged in!")
                        TokenManager.setToken(data.user_id);
                        window.location.href = "/types";
                    }
                    else {
                        this.notify("Can't login!")
                    }
                })
        } else {
            this.notify('Not valid!')
        }
    }

    notify (text) { toast(text); }

    render() {
        if (this.context.user_id) window.location.href = "/";
        return (
            <div className={classes.auth}>
            <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnHover={false} style={{ color: "#343434" }} />
                <img className={classes.logo} src={Logo} alt="" />
                <input type="text" placeholder="Nick" ref={this.nickRef} />
                <input type="password" placeholder="Hasło" id="password" ref={this.passwordRef} />
                <button className={classes.actionBtn} onClick={this.login}>Zaloguj</button>
            </div>
        )
    }
}

export default Login
