import React, { Component } from 'react'

export class TableRow extends Component {

    constructor() {
        super();
        this.calculatePoints = this.calculatePoints.bind(this);
    }

    calculatePoints(props) {
        let points = 0;

        const userTypes = this.props.types.filter(type => type.user_id === this.props.user.user_id);
        for (const type of userTypes) {
            const match = this.props.matches.filter(match => match.match_id === type.match_id)[0];
            const isGoalsDifferenceCorrect = Math.abs(type.team1_goals - type.team2_goals) == Math.abs(match.team1_goals - match.team2_goals);
            const isWinnerCorrect = (match.team1_goals > match.team2_goals && type.team1_goals > type.team2_goals) || (match.team1_goals < match.team2_goals && type.team1_goals < type.team2_goals)
            // EXACT TYPE
            if (type.team1_goals == match.team1_goals && type.team2_goals == match.team2_goals) {
                points += 3;
            }
            else if (isGoalsDifferenceCorrect) {
                points += 2;
            }
            else if (isWinnerCorrect) {
                points += 1;
            }
        }
        return points;
    }

    render(props) {
        return (
            <tr>
                <td>{this.props.user.nick}</td>
                <td>{this.calculatePoints()}</td>
            </tr>
        )
    }
}

export default TableRow
