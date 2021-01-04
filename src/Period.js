import React, { Component } from 'react';
import "./Period.css";

class Period extends Component {
    state = {  }

    render() { 
        let iconURL = `http://openweathermap.org/img/wn/${this.props.period.weather[0].icon}@2x.png`;
        return ( 
        <div className="period">
            <span className="period__date">{this.props.period.dt_txt}</span>
            <img src={iconURL} className="period__img" alt=""/>
            <span className="period__temp">{this.props.period.main.temp}°C</span>
        </div>
        );
    }
}
 
export default Period;