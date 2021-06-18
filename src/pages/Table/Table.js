import React, { Component } from 'react'
import classes from './table.module.css';
import TableRow from './TableRow'
import { SERVER_URL } from '../../constans/constans';
export class Table extends Component {

    constructor() {
        super();
        this.state = {
            matches: [],
            users: [],
            types: []
        }
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/table`)
            .then(res => res.json())
            .then(data => {
                const usersMsg = data.filter(e => e.users)[0];
                const matchesMsg = data.filter(e => e.matches)[0];
                const typesMsg = data.filter(e => e.types)[0];

                if (usersMsg && matchesMsg && typesMsg) {
                    this.setState({
                        matches: [...matchesMsg.matches],
                        users: [...usersMsg.users],
                        types: [...typesMsg.types]
                    })
                }
            })
    }

    render() {
        return (
            <table>
                <tr>
                    <th>Nick</th>
                    <th>Punkty</th>
                </tr>
                {this.state.users.map(user => (
                    <TableRow user={user} matches={this.state.matches} types={this.state.types} />
                ))}
            </table>
        )
    }
}

export default Table
