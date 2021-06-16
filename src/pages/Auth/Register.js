import React, { Component, createRef } from 'react'
import classes from './auth.module.css';
import {MESSAGE} from '../../constans/constans';
export class Register extends Component {

    constructor() {
        super();
        this.nickRef = createRef();
        this.password1Ref = createRef();
        this.password2Ref = createRef();
        this.register = this.register.bind(this);
    }

    register() {
        const nick = this.nickRef.current.value;
        const password1 = this.password1Ref.current.value;
        const password2 = this.password2Ref.current.value;
        console.log('register')
        // if (password1 === password2 && password1.length >= 6 && nick.length >= 6) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ nick, password: password1 })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.msg === MESSAGE.SUCCESS) {
                    alert('Registered!')
                }
            })
        //}
    }

    render() {
        return (
            <div className={classes.auth}>
                <input type="text" placeholder="Nick" ref={this.nickRef} />
                <input type="password" placeholder="Hasło" id="password1" ref={this.password1Ref} />
                <input type="password" placeholder="Powtórz hasło" id="password2" ref={this.password2Ref} />
                <button onClick={this.register}>Zrejestruj</button>
            </div>
        )
    }
}

export default Register
