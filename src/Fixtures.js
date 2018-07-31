import React, { Component } from 'react'

import './Fixtures.css'

class Fixtures extends Component {
    constructor(props) {
        super(props);
        this.API_KEY = "d5e0cd3b07514e8198f0a5741c0837c8";
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

        fetch('http://api.football-data.org/v1/fixtures', myOptions)
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
            <ul>
                {fixtures.map(fixture =>
                <li key={fixture.homeTeamName}>
                    <h3>{fixture.homeTeamName}</h3>
                    <h3>{fixture.awayTeamName}</h3>
                </li>
                )}
            </ul>
        );
    }
}

export default Fixtures