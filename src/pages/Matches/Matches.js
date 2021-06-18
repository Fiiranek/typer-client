import React, { Component } from 'react'
import classes from './matches.module.css'
import { MESSAGE, SERVER_URL } from '../../constans/constans'
import MatchTile from '../../components/MatchTile/MatchTile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Matches extends Component {

    constructor() {
        super();
        this.state = {
            matches: []
        }
        this.getMatches = this.getMatches.bind(this);
    }

    getMatches() {
        fetch(`${SERVER_URL}/matches`)
            .then(res => res.json())
            .then(data => {
                if (data.msg === MESSAGE.SUCCESS) {
                    this.setState({ matches: [...data.matches] })
                } else {
                    this.notify('Could not get matches!');
                }

            })
    }

    componentDidMount() {
        this.getMatches();
    }

    notify (text) { toast(text); }

    render() {
        return (
            <div className={classes.matches}>
            <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnHover={false} style={{ color: "#343434" }} />
                {this.state.matches.map(match => <MatchTile match={match} getMatches={this.getMatches} />)}
            </div>
        )
    }
}

export default Matches
