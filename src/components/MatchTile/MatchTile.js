import React, { Component, createRef } from 'react'
import classes from './matchTile.module.css'
import { MESSAGE, COUNTRY_CODES, SERVER_URL, FLAG_SIZE } from '../../constans/constans';
import { TokenContext } from '../../contexts/TokenContext'
import {formatDate} from '../../utils/Utils'
export class MatchTile extends Component {
    static contextType = TokenContext;
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
        this.changeBtn = this.changeBtn.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
    }

    changeBtn() {
        if (this.context.isAdmin) {
            return <button onClick={() => {
                if (this.state.team1_goals >= 0 && this.state.team2_goals >= 0) {
                    fetch(`${SERVER_URL}/match`, {
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
            }} className={classes.actionBtn}>Zmień</button>
        }
    }

    changeScoreSelect(props) {

        return (
            <div>
                <input ref={this.team1_goalsRef} onChange={e => this.change(e)} name="team1_goals" value={this.state.team1_goals} type="number" min={-1} max={100} className={classes.scoreInput} />
                <span className={classes.scoreInput} >&nbsp;:&nbsp;</span>
                <input ref={this.team2_goalsRef} onChange={e => this.change(e)} name="team2_goals" value={this.state.team2_goals} type="number" min={-1} max={100} className={classes.scoreInput} />

                {/*</div><button disabled={this.state.isChangeDisabled} onClick={() => {*/}
                {this.changeBtn()}
                {this.deleteBtn()}
            </div>

        )

    }

    change(e) {

        this.setState({
            [e.target.name]: parseInt(e.target.value)
        }, () => console.log(this.state))
    }

    deleteBtn() {
        if (this.context.isAdmin) {
            return (<button onClick={() => {
                fetch(`${SERVER_URL}/delete-match`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body:
                        JSON.stringify({
                            match_id: this.props.match.match_id,
                        })

                })
                    .then(res => res.json())
                    .then(data => {
                        this.props.getMatches();
                    })
            }} className={classes.actionBtn}>Usuń</button>)
        }
    }

    render(props) {

        const match = this.props.match;
        return (
            <div className={classes.match}>
                <div className={classes.matchHeader}>
                    <img className={classes.flag} src={`https://www.countryflags.io/${COUNTRY_CODES[match.team1]}/flat/${FLAG_SIZE}.png`} alt="" />
                    <span>&nbsp;-&nbsp;</span>
                    <img className={classes.flag} src={`https://www.countryflags.io/${COUNTRY_CODES[match.team2]}/flat/${FLAG_SIZE}.png`} alt="" />
                </div>
                <div className={classes.matchHeader}>
                    <span>{match.team1} </span>
                    <span>&nbsp;-&nbsp;</span>
                    <span> {match.team2}</span>
                </div>
                <span>{formatDate(match.date)}</span>
                {this.changeScoreSelect()}


            </div>
        )
    }
}

export default MatchTile
