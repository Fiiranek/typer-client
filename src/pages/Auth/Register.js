import React, { Component, createRef } from 'react'
import classes from './auth.module.css';
import { MESSAGE, SERVER_URL } from '../../constans/constans';
import Logo from '../../assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Register extends Component {

    constructor() {
        super();
        this.nickRef = createRef();
        this.password1Ref = createRef();
        this.password2Ref = createRef();
        this.register = this.register.bind(this);
        this.isRegisterInfoValid = this.isRegisterInfoValid.bind(this);
    }

    isRegisterInfoValid(nick, p1, p2) {
        if (p1 !== p2) return false;
        if (p1.length < 5) return false;
        if (nick.length < 5) return false;
        return true;
    }

    register() {
        const nick = this.nickRef.current.value;
        const password1 = this.password1Ref.current.value;
        const password2 = this.password2Ref.current.value;
        const isValid = this.isRegisterInfoValid(nick, password1, password2);
        if (isValid) {
            fetch(`${SERVER_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nick, password: password1 })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.msg === MESSAGE.SUCCESS) {
                        window.location.href = "/login";
                    }
                })
        } else {
            this.notify('Not valid!')
        }
    }

    notify (text) { toast(text); }

    render() {
        return (
            <div className={classes.auth}>
            <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnHover={false} style={{ color: "#343434" }} />
                <img  className={classes.logo}  src={Logo} alt="" />
                <input type="text" placeholder="Nick" ref={this.nickRef} />
                <input type="password" placeholder="Hasło" id="password1" ref={this.password1Ref} />
                <input type="password" placeholder="Powtórz hasło" id="password2" ref={this.password2Ref} />
                <button className={classes.actionBtn} onClick={this.register}>Stwórz konto</button>
            </div>
        )
    }
}

export default Register
