/* GENERAL IMPORTS */
import React, { Component } from 'react'

import './Matches.css'

/* IMPORT COMPONENTS */
import Team from './Team'
import TimeScore from './TimeScore'

class Matches extends Component {
    constructor(props) {
        super(props);
        this.API_KEY = "d5e0cd3b07514e8198f0a5741c0837c8";
        this.API_URL = "http://api.football-data.org/";
        this.API_VERSION = "v2/";
        // 2014 = La Liga | 2015 = Ligue 1 | 2019 = Serie A | 2021 = PremierLeague
        this.API_REQUEST = "matches?competitions=2021,2014&dateFrom=2018-08-16&dateTo=2018-08-18";
        this.state = {
            matches: [],
        };
    }

    componentDidMount() {
        // Headers API Call
        var myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", this.API_KEY);
        myHeaders.append("Content-Type", "text/plain")
        
        // Options API Call
        var myOptions = { 
            method: 'GET',
            headers: myHeaders,
            cache: 'default' 
        };

        // API call + setState matches
        fetch(this.API_URL+this.API_VERSION+this.API_REQUEST, myOptions)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                matches: responseData.matches,
            });
        })
        
    }

    render() {
        const { matches } = this.state;
        const imgPath = 'assets/img/badges/', imgExt = '.png';

        return (
            <ul className="matches">
                {matches.map(match =>
                <li className="matches--match" key={match.homeTeam.name+'-'+match.awayTeam.name}>
                    {/* League • Day */}
                    <span className="match--league"><img className="league--badge" alt={match.competition.name} src={imgPath+match.competition.name.replace(' ', '_')+imgExt} /></span>
                    {/* Home Team */}
                    <Team 
                        TeamName={match.homeTeam.name} 
                        TeamID={match.homeTeam.id} 
                        TeamStatus="home" />
                    {/* Scheduled Hour or Score if match is finished */}
                    <TimeScore 
                        MatchStatus={match.status} 
                        MatchScoreDuration={match.score.duration} 
                        MatchScoreWinner={match.score.winner}
                        MatchScoreFTHomeTeam={match.score.fullTime.homeTeam}
                        MatchScoreFTAwayTeam={match.score.fullTime.awayTeam}
                        MatchScoreETHomeTeam={match.score.extraTime.homeTeam}
                        MatchScoreETAwayTeam={match.score.extraTime.awayTeam}
                        MatchDate={match.utcDate} />
                    {/* Away Team */}
                    <Team 
                        TeamName={match.awayTeam.name} 
                        TeamID={match.awayTeam.id} 
                        TeamStatus="away" />
                </li>
                )}
            </ul>
        );
    }
}

export default Matches