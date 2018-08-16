/* GENERAL IMPORTS */
import React, { Component } from 'react'

class TimeScore extends Component {
    render() {
        return(
            <div>
            {this.props.MatchStatus === 'FINISHED' ? (
                this.props.MatchScoreDuration === 'REGULAR' ? (
                    this.props.MatchScoreWinner === 'HOME_TEAM' ? (
                        <span className="match--separator">
                            <strong>{this.props.MatchScoreFTHomeTeam}</strong> - {this.props.MatchScoreFTAwayTeam}
                        </span>
                    ) : (
                        this.props.MatchScoreWinner === 'DRAW' ? (
                            <span className="match--separator">
                                {this.props.MatchScoreFTHomeTeam} - {this.props.MatchScoreFTAwayTeam}
                            </span>
                        ) : (
                            <span className="match--separator">
                                {this.props.MatchScoreFTHomeTeam} - <strong>{this.props.MatchScoreFTAwayTeam}</strong>
                            </span>
                        )
                    )
                ) : (
                    this.props.MatchScoreWinner === 'HOME_TEAM' ? (
                        <span className="match--separator">
                            <strong>{this.props.MatchScoreETHomeTeam}</strong> - {this.props.MatchScoreETAwayTeam}
                        </span>
                    ) : (
                        this.props.MatchScoreWinner === 'DRAW' ? (
                            <span className="match--separator">
                                {this.props.MatchScoreETHomeTeam} - {this.props.MatchScoreETAwayTeam}
                            </span>
                        ) : (
                            <span className="match--separator">
                                {this.props.MatchScoreETHomeTeam} - <strong>{this.props.MatchScoreETAwayTeam}</strong>
                            </span>
                        )
                    )
                )
            ) : (
                <span className="match--separator">{this.props.MatchDate.slice(11,16)}</span>
            )}
        </div>
        )
    }
}

export default TimeScore