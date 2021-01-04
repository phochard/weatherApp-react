import React, { Component } from 'react';

import Period from "./Period";
import "./WeatherSystem.css";
import axios from 'axios';


class WeatherSystem extends Component {
    state = {
        periods: [],
        displayCity: 'Ablain-Saint-Nazaire',
        defaultCity: 'Ablain-Saint-Nazaire',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=Ablain-Saint-Nazaire&lang=fr&units=metric&appid=8c3a54c385c9c9d874d88f2cd6b3dda8`,
      }
    

    handleChange = (e) =>{console.log(this.state.defaultCity);
        this.setState({
            defaultCity : e.target.value,
        });
      }
    handleSubmit = (e) =>{
        e.preventDefault();
        let newURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.defaultCity}&lang=fr&units=metric&appid=8c3a54c385c9c9d874d88f2cd6b3dda8`;
        this.setState({
           url: newURL,
           displayCity: this.state.defaultCity
        });
        console.log(newURL);
      }
    componentDidMount = () => {
        axios.get(`${this.state.url}`)
        .then(res => {
            this.setState({
                periods: res.data.list
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            axios.get(`${this.state.url}`)
            .then(res => {
                this.setState({
                    periods: res.data.list
                })
            })
        }
      }
      
    render() { 
        let periodsListBig = this.state.periods.map(period => {
            return <Period period={period} />
        }).slice(0,1)
        let periodsListSmall= this.state.periods.map(period => {
            return <Period period={period} />
        }).slice(1,5)
        return ( 
            <div className="weathersystem">
                <form className="weathersystem__form" onSubmit={this.handleSubmit}  onChange={this.handleChange}>                
                    <input className="weathersystem__form__input" type="text" placeholder="Enter a city..."/>
                    <button className="weathersystem__form__button" >Send</button>
                </form>
                
            <div className="weathersystem__content">
                <h2 className="weathersystem__content__title">Weather of {this.state.displayCity}</h2>
                <h3 className="weathersystem__content__subtitle">Actually</h3>
                <div className="weathersystem__content__oneCard">{periodsListBig}</div> 
                <h3 className="weathersystem__content__subtitle">Within the next 12 hours</h3>
                <div className="weathersystem__content__severalCards"> {periodsListSmall}</div>
            </div>
            </div>
         );
    }
}
 
export default WeatherSystem;