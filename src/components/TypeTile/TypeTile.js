import React, { Component, createRef } from 'react'
import classes from '../MatchTile/matchTile.module.css'
import { TokenContext } from '../../contexts/TokenContext'
import { MESSAGE, COUNTRY_CODES, SERVER_URL, FLAG_SIZE } from '../../constans/constans'
import {formatDate} from '../../utils/Utils'
export class TypeTile extends Component {
    static contextType = TokenContext;
    constructor(props) {
        super(props);
        this.team1Ref = createRef();
        this.team2Ref = createRef();
        this.state = {
            isChangeDisabled: true,
            isType: false,
            team1_goals: 0,
            team2_goals: 0
        }
        this.addTypeSelect = this.addTypeSelect.bind(this);
        this.change = this.change.bind(this);
        this.getType = this.getType.bind(this);
    }

    getType() {
        fetch(`${SERVER_URL}/type`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ user_id: this.context.user_id, match_id: this.props.match.match_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                const matchDateMsg = data.filter(e => e.date)[0];
                const typeMsg = data.filter(e => e.type)[0];

                if (matchDateMsg) {
                    const currentTimestamp = new Date().getTime()
                    const matchTimestamp = new Date(matchDateMsg.date).getTime();
                    const isChangeDisabled = matchTimestamp - currentTimestamp < (1 * 60 * 60 * 1000)

                    if (typeMsg) {
                        this.setState({
                            type_id: typeMsg.type.type_id,
                            team1_goals: typeMsg.type.team1_goals,
                            team2_goals: typeMsg.type.team2_goals,
                            isType: true,
                            isChangeDisabled: isChangeDisabled
                        })
                    } else {
                        this.setState({
                            isType: false,
                            isChangeDisabled: isChangeDisabled
                        })
                    }

                }


            })
            .catch(err => console.log(err))
    }

    componentDidMount(props) {
        this.getType();
    }

    change(e) {

        this.setState({
            [e.target.name]: parseInt(e.target.value)
        }, () => console.log(this.state))
    }

    addTypeSelect(props) {
        return (
            <div>
                <input ref={this.team1Ref} onChange={e => this.change(e)} name="team1_goals" value={this.state.team1_goals} type="number" min={0} max={100} readOnly={this.state.isChangeDisabled} className={classes.scoreInput} />
                <span className={classes.scoreInput} >&nbsp;:&nbsp;</span>
                <input ref={this.team2Ref} onChange={e => this.change(e)} name="team2_goals" value={this.state.team2_goals} type="number" min={0} max={100} readOnly={this.state.isChangeDisabled} className={classes.scoreInput} />


            </div>

        )

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
                <span>{}</span>
                {this.addTypeSelect()}
                <button disabled={this.state.isChangeDisabled} onClick={() => {
                    if (!this.state.isChangeDisabled) {
                        fetch(this.state.isType ? `${SERVER_URL}/change-type` : `${SERVER_URL}/add-type`, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: this.state.isType ?
                                JSON.stringify({
                                    type_id: this.state.type_id,
                                    team1_goals: this.state.team1_goals,
                                    team2_goals: this.state.team2_goals,
                                })
                                :
                                JSON.stringify({
                                    user_id: this.context.user_id,
                                    match_id: this.props.match.match_id,
                                    team1_goals: this.state.team1_goals,
                                    team2_goals: this.state.team2_goals,
                                })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.msg === MESSAGE.SUCCESS) {
                                    this.getType();
                                    alert('Changed type succesfuly!')
                                }
                            })
                    }
                }} className={classes.actionBtn}>{this.state.type_id ? 'Zmień' : 'Dodaj'}</button>
            </div>
        )
    }
}

export default TypeTile
