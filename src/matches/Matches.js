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
        // 2014 = LaLiga | 2015 = Ligue 1 | 2019 = Serie A | 2021 = PremierLeague
        this.API_REQUEST = "matches?competitions=2021,2014&dateFrom=2018-08-23&dateTo=2018-08-25";
        this.state = {
            matches: [],
            competitions: [],
            competitionsInfos : []
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

        // API call for todays matches + setState matches
        fetch(this.API_URL+this.API_VERSION+this.API_REQUEST, myOptions)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                competitions: responseData.filters.competitions,
                matches: responseData.matches,
            }, function() {
                // API call for each competitions playing today
                this.state.competitions.map(function(currentElement, index){
                    fetch(this.API_URL+this.API_VERSION+"/competitions/"+currentElement+"/standings", myOptions)
                    .then((comp) => comp.json())
                    .then((compData) => {
                        this.setState({
                            competitionsInfos: this.state.competitionsInfos.concat(compData),
                        });
                    })
                }, this);
            });
        })
        
    }

    render() {
        const { matches } = this.state;
        const imgPath = 'assets/img/badges/', imgExt = '.png';
        var fixtures = [], bfScore = 0;

        // BF Score for every matches
        fixtures = matches.map(match => {
            this.state.competitionsInfos.map(compInfos => 
                compInfos.competition.id == match.competition.id ? (
                    bfScore = compInfos.standings[0].table
                        .filter((standings) => { return standings.team.id == match.homeTeam.id || standings.team.id == match.awayTeam.id })
                        .map((teamsScore) => { 
                        /* ( 2 * reverse position in table ) + ( 4 * ( goals for + goals against * 0,6 ) / games played ) */
                        return ( 3 * (21 - teamsScore.position) ) + ( 6 * (teamsScore.goalsFor + teamsScore.goalsAgainst * 0.6 ) / teamsScore.playedGames) })
                        .reduce((homeScore, awayScore) => { return Math.round((homeScore + awayScore) * 10) / 10 }, 0)
                ) : null
            )
            match.bfScore = bfScore;
            return match;
        })
        // sort matches by BF Score
        fixtures.sort(function(a, b) {
            return b.bfScore - a.bfScore;
        })
        

        return (
            <ul className="matches">
                {fixtures.map(match =>
                <li className="matches--match" key={match.homeTeam.id+'-'+match.awayTeam.id}>
                    {/* League */}
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
                    {/* BF Score */}
                    <span className="bf--score">
                        {match.bfScore}
                    </span>
                </li>
                )}
            </ul>
        );
    }
}

export default Matches