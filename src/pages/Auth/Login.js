import React, { Component, createRef } from 'react'
import { MESSAGE } from '../../constans/constans';
import classes from './auth.module.css'
import TokenManager from '../../token/TokenManager';
import { TokenContext } from '../../contexts/TokenContext'
export class Login extends Component {
    static contextType = TokenContext;
    constructor() {
        super();
        this.nickRef = createRef();
        this.passwordRef = createRef();
        this.login = this.login.bind(this);
    }

    login() {
        const nick = this.nickRef.current.value;
        const password = this.passwordRef.current.value;

        // if (password1 === password2 && password1.length >= 6 && nick.length >= 6) {
        fetch('/login', {
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
                    
                    alert('Logged in!')
                    TokenManager.setToken(data.user_id);
                    window.location.href = "/types";
                }
                else {
                    alert('Cannot log in!')
                }
            })
        //}
    }

    render() {
        if (this.context.user_id) window.location.href = "/";
        return (
            <div className={classes.auth}>
                <input type="text" placeholder="Nick" ref={this.nickRef} />
                <input type="password" placeholder="Hasło" id="password" ref={this.passwordRef} />
                <button onClick={this.login}>Zaloguj</button>
            </div>
        )
    }
}

export default Login
