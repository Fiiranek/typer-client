import React, { Component, createRef } from 'react'
import classes from './matchTile.module.css'
import { MESSAGE, COUNTRY_CODES } from '../../constans/constans';
export class MatchTile extends Component {

    constructor(props) {
        super();
        this.state = {
            team1_goals: props.match.team1_goals,
            team2_goals: props.match.team2_goals,
        }

        this.team1_goalsRef = createRef();
        this.team2_goalsRef = createRef();
        this.changeScoreSelect = this.changeScoreSelect.bind(this);
        this.change = this.change.bind(this);
    }

    changeScoreSelect(props) {
        return (
            <div>
                <input ref={this.team1_goalsRef} onChange={e => this.change(e)} name="team1_goals" value={this.state.team1_goals} type="number" min={-1} max={100} />
                <span>&nbsp;:&nbsp;</span>
                <input ref={this.team2_goalsRef} onChange={e => this.change(e)} name="team2_goals" value={this.state.team2_goals} type="number" min={-1} max={100} />

                <button disabled={this.state.isChangeDisabled} onClick={() => {
                    if (this.state.team1_goals >= 0 && this.state.team2_goals) {
                        fetch('/match', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body:
                                JSON.stringify({
                                    match_id: this.props.match.match_id,
                                    team1_goals: this.state.team1_goals,
                                    team2_goals: this.state.team2_goals,
                                })

                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.msg === MESSAGE.SUCCESS) {
                                    alert('Changed match score succesfuly!')
                                }
                            })
                    } else {
                        alert('Score must be 0:0 or bigger')
                    }
                }}>Zmień</button>
            </div>

        )

    }

    change(e) {

        this.setState({
            [e.target.name]: parseInt(e.target.value)
        }, () => console.log(this.state))
    }

    render(props) {

        const match = this.props.match;
        return (
            <div className={classes.match}>
                <div className={classes.matchHeader}>
                    <img src={`https://www.countryflags.io/${COUNTRY_CODES[match.team1]}/flat/32.png`} alt=""/>
                    <span>&nbsp;-&nbsp;</span>
                    <img src={`https://www.countryflags.io/${COUNTRY_CODES[match.team2]}/flat/32.png`} alt=""/>
                </div>
                <div className={classes.matchHeader}>
                    <span>{match.team1} </span>
                    <span>&nbsp;-&nbsp;</span>
                    <span> {match.team2}</span>
                </div>
                <span>Data: {match.date}</span>
                {this.changeScoreSelect()}
                <button onClick={() => {
                    fetch('/delete-match', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body:
                            JSON.stringify({
                                match_id: match.match_id,
                            })

                    })
                        .then(res => res.json())
                        .then(data => {
                            window.location.reload();
                        })
                }}>Usuń</button>

            </div>
        )
    }
}

export default MatchTile
