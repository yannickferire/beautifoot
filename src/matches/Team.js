/* GENERAL IMPORTS */
import React, { Component } from 'react'

class Team extends Component {
    render() {
        const imgPath = 'assets/img/badges/', imgExt = '.png';

        return(
            <h3 className={'match--'+this.props.TeamStatus}>
                {this.props.TeamStatus === 'away' ? <img className="match--badge away--badge" alt={this.props.TeamName} src={imgPath+this.props.TeamID+imgExt} /> : null}
                {this.props.TeamName}
                {this.props.TeamStatus === 'home' ? <img className="match--badge home--badge"  alt={this.props.TeamName} src={imgPath+this.props.TeamID+imgExt} /> : null}                  
            </h3>
        )
    }
}

export default Team