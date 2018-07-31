import React, { Component } from 'react'

import './Fixtures.css'

class Fixtures extends Component {
    constructor(props) {
        super(props);
        this.API_KEY = "d5e0cd3b07514e8198f0a5741c0837c8";
        this.API_URL = "http://api.football-data.org/";
        this.API_VERSION = "v1/";
        this.API_REQUEST = "fixtures";
        this.state = {
            fixtures: [],
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
            this.setState({
                fixtures: responseData.fixtures,
            });
        })
        
    }

    render() {
        const { fixtures } = this.state;
        return (
            <ul className="fixtures">
                {fixtures.map(fixture =>
                <li className="fixtures--fixture" key={fixture.homeTeamName+'-'+fixture.awayTeamName}>
                    <h3 className="fixture--home">{fixture.homeTeamName}</h3>
                    <h3 className="fixture--away">{fixture.awayTeamName}</h3>
                </li>
                )}
            </ul>
        );
    }
}

export default Fixtures