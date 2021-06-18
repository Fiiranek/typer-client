import React, { Component } from 'react'
import { MESSAGE, SERVER_URL } from '../../constans/constans';
import classes from './types.module.css';
import { TokenContext } from '../../contexts/TokenContext'
import TypeTile from '../../components/TypeTile/TypeTile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Types extends Component {
    static contextType = TokenContext;
    constructor() {
        super();
        this.state = {
            matches: []
        }
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/matches`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.msg === MESSAGE.SUCCESS) {
                    this.setState({ matches: [...data.matches] })
                } else {
                    alert('Could not get matches!');
                }

            })
            .catch(err => console.log(err))
    }

    notify (text) { toast(text); }

 

    render() {
        return (
            <div className={classes.matches}>
            <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnHover={false} style={{ color: "#343434" }} />
                {this.state.matches.map(match => <TypeTile match={match}/>)}
            </div>
        )
    }
}

export default Types
