import React, { Component } from 'react'
import API from "../../api";

import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import Srise from "../../assets/img/weather_icons/sunrise.png";
import Sset from "../../assets/img/weather_icons/sunset.png";
import Wind_speed from "../../assets/img/weather_icons/wind.png";
import Presp from "../../assets/img/weather_icons/presp.png";

// getting api key for .env file
const APIkey = process.env.REACT_APP_API_KEY;

class Weather extends Component {

  constructor(props) {
    super(props)
    console.log(props)
   
    this.state = {
      data: [],
      weather: "",
      search: "",
      error: false
    }
    this.scaleType = window.localStorage.getItem("scaleType");
    if (this.scaleType !== undefined || null) {
      window.localStorage.setItem("scaleType", "C")
      this.scaleType = "C"
      this.toggleCheck = false
    } 
    if (this.scaleType == "C") {
      this.toggleCheck = false
    } else {
      this.toggleCheck = true
    }
  }
  datapopulate() {
    this.setState({ error: false })
    console.log(this.props.search)
    let search = this.props.search
    if (this.props.search == null) {
      search = "Melbourne, Victoria, Australia"
    }
    let units = "M"
    var scaleType = window.localStorage.getItem("scaleType");
    if (scaleType == "C") {
      this.toggleCheck = true
    } else {
      this.toggleCheck = false
      units = "I"
    }
    API.get(`https://api.weatherbit.io/v2.0/current?&city=${search}&key=${APIkey}&units=${units}`)
      .then((res) => {
        console.log(res.data);
        if (res.data == "") {
          this.setState({ error: true })
        }
        this.setState({ data: res.data.data[0], weather: res.data.data[0].weather.description, icon: res.data.data[0].weather.icon })


      })
      .catch((e) => {
        console.log(e);
      })

  }

  componentDidUpdate() {
    if (this.props.search !== this.state.search) {
      let state = this.state
      state.search = this.props.search
      this.setState(state)
      this.datapopulate()
    }
  }

  componentDidMount() {
    if (this.props.search !== this.state.search) {
      let state = this.state
      state.search = this.props.search
      this.setState(state)
      this.datapopulate()
    }
  }

  // toggle to switch between the units of temp 

  toggleSwitch() {
    let scale = window.localStorage.getItem("scaleType")
    if (scale == "C") {
      window.localStorage.setItem("scaleType", "F")
      this.scaleType = "F"
    } else {
      window.localStorage.setItem("scaleType", "C")
      this.scaleType = "C"
    }
    this.datapopulate()
  }

  render() {
    const { data } = this.state
    const { weather } = this.state
    const { icon } = this.state


    if (this.state.error) {
      return (
        <div>Error weather not updated</div>
      )
    }

    else {    
      return (
        <div className="weather_card">
          <div className="weather_card--contents row">
            <div className="content-left col-lg-3">
              <p className="city_name">{data.city_name}, {data.country_code}</p>
              <p className="today">Today</p>
              <img className="weather_img" src={'https://www.weatherbit.io/static/img/icons/' + icon + '.png'}></img>
              <div className="text-center">
                <span className="weather_desc">{weather}</span>
              </div>
            </div>
            <div className="content-right col-lg-9">
              <BootstrapSwitchButton
                checked={this.toggleCheck}
                onlabel='ºC'
                offlabel='ºF'
                width={10}
                onstyle="outline-primary" offstyle="outline-warning"
                onChange={() => { this.toggleSwitch() }}
              />
              <div className="current_temperature">{data.temp} º{this.scaleType}</div>
              <table className="more_details">
                <tbody>
                  <tr>
                    <td>Preciptation</td>
                    <td><img className="more_icon" src={Presp}/></td>
                    <td>{data.pres}</td>
                  </tr>
                  <tr>
                    <td>Wind Speed</td>
                    <td><img className="more_icon" src={Wind_speed}/></td>
                    <td>{data.wind_spd}</td>
                  </tr>
                  <tr>
                    <td>Sunrise</td>
                    <td><img className="more_icon" src={Srise}/></td>
                    <td>{data.sunrise}</td>
                  </tr>
                  <tr>
                    <td>Sunset</td>
                    <td><img className="more_icon" src={Sset}/></td>
                    <td>{data.sunset}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>          
        </div>
      )
    }
  }
}


export default Weather;

