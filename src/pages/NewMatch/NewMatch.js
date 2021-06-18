import React, { Component } from 'react'
import classes from './newMatch.module.css';
import { MESSAGE, COUNTRY_LIST, SERVER_URL } from '../../constans/constans'


export class NewMatch extends Component {

    constructor() {
        super()
        this.state = {
            team1: COUNTRY_LIST[0],
            team2: COUNTRY_LIST[1],
        }
        this.change = this.change.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    submit(e) {
        e.preventDefault();
        fetch(`${SERVER_URL}/new-match`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ team1: this.state.team1, team2: this.state.team2, date: this.state.date })
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg === MESSAGE.SUCCESS) alert('Match added!')
                else alert('Could not add match!');
            })
    }

    render() {
        return (
            <form className={classes.newMatch} onSubmit={e => this.submit(e)}>
                <input type="datetime-local" name="date" id="" required onChange={e => this.change(e)} />

                <div>
                    <select name="team1" id="" onChange={e => this.change(e)} required>
                        <option value="-" selected disabled hidden>-</option>
                        {COUNTRY_LIST.map(team => (<option value={team}>{team}</option>))}
                    </select>
                    <span> - </span>
                    <select name="team2" id="" onChange={e => this.change(e)} required>
                        <option value="-" selected disabled hidden>-</option>
                        {COUNTRY_LIST.map(team => (<option value={team}>{team}</option>))}
                    </select>
                </div>
                <button type="submit">Dodaj</button>
            </form>
        )
    }
}

export default NewMatch
