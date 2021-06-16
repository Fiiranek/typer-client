import React, { Component } from 'react'
import classes from './matches.module.css'
import {MESSAGE} from '../../constans/constans'
import MatchTile from '../../components/MatchTile/MatchTile'
export class Matches extends Component {

    constructor(){
        super();
        this.state = {
            matches:[]
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/matches')
            .then(res => res.json())
            .then(data => {
                if (data.msg === MESSAGE.SUCCESS) {
                    this.setState({ matches: [...data.matches] })
                } else {
                    alert('Could not get matches!');
                }

            })
    }

    render() {
        return (
            <div className={classes.matches}>
                {this.state.matches.map(match => <MatchTile match={match}/>)}
            </div>
        )
    }
}

export default Matches
