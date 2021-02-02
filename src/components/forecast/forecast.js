import React, { Component } from 'react'

import API from "../../api";

const APIkey = process.env.REACT_APP_API_KEY;

class Forecast extends Component {

    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            data: [],
            weather: "",
            search: "",
            error: false,
        }
    }

    datapopulate() {
        let data;
        this.setState({ error: false })
        let search = this.props.search
        if (this.props.search == null) {
            search = "Melbourne, Victoria, Australia"
        }
        
        API.get(`https://api.weatherbit.io/v2.0/forecast/daily?&city=${search}&key=${APIkey}`)
            .then((res) => {
                this.setState({ data: res.data.data, search: this.props.search })
                data = res.data.data;
                console.log(data);
                if (data.length == 0) {
                    this.setState({ error: true })
                }
            })
            .catch((e) => {
                console.log(e);
            });
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

  render() {

    if (this.state.error) {
        return (
            <div>

            </div>
        )
    }        

    else {
        let forcasteHtml = []
        if(this.state.error !== true)
        {
            for (const [index, value] of this.state.data.entries()) {
                if (index == 0) {
                    continue;
                }
                if (index == 8) {
                    break;
                }
                let day = new Date(value.datetime).toDateString()

             

                forcasteHtml.push(<div className="daily_forecast" key={index}>
                    <p>{day[0]}{day[1]}{day[2]}</p>
                    <img src={'https://www.weatherbit.io/static/img/icons/' + value.weather.icon + '.png'}></img>
                    <p> {value.weather.description} </p>
                    <span> {value.min_temp}ºC/{value.max_temp}ºC </span>
                </div>)

            }    
    
      return (
                <div className="Forecast_card">
                    <div className="forecast_card">
                        {forcasteHtml}
                    </div>
                </div>
            )
            }
        }
    }
}


export default Forecast;

