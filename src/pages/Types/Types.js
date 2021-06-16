import React, { Component } from 'react'
import { MESSAGE } from '../../constans/constans';
import classes from './types.module.css';
import { TokenContext } from '../../contexts/TokenContext'
import TypeTile from '../../components/TypeTile/TypeTile'
export class Types extends Component {
    static contextType = TokenContext;
    constructor() {
        super();
        this.state = {
            matches: []
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
                {this.state.matches.map(match => <TypeTile match={match}/>)}
            </div>
        )
    }
}

export default Types
