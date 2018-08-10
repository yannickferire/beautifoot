import React, { Component } from 'react'

import './Matches.css'

class Matches extends Component {
    constructor(props) {
        super(props);
        this.API_KEY = "d5e0cd3b07514e8198f0a5741c0837c8";
        this.API_URL = "http://api.football-data.org/";
        this.API_VERSION = "v2/";
        // 2014 = La Liga | 2015 = Ligue 1 | 2019 = Serie A | 2021 = PremierLeague
        this.API_REQUEST = "competitions/2021/matches";
        this.state = {
            matches: [],
        };
    }

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", this.API_KEY);
        myHeaders.append("Content-Type", "text/plain")
        
        var myOptions = { 
            method: 'GET',
            headers: myHeaders,
            cache: 'default' 
        };

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
                    <h3 className="match--home">
                        <img className="match--badge home--badge" alt={match.homeTeam.name} src={imgPath+match.homeTeam.id+imgExt} /> 
                        {match.homeTeam.name}
                    </h3>
                    &nbsp;vs&nbsp;
                    <h3 className="match--away">
                        <img className="match--badge away--badge" alt={match.awayTeam.name} src={imgPath+match.awayTeam.id+imgExt} /> 
                        {match.awayTeam.name}
                    </h3>
                </li>
                )}
            </ul>
        );
    }
}

export default Matches