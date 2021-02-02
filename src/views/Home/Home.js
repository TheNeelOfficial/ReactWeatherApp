import React, {  Component } from "react";

import Search from '../../components/search/search'
import Weather from '../../components/weather/weather'
import Forecast from '../../components/forecast/forecast'



class Home extends Component {

  render() {
    return (
      <div className="home container">
        <Search />
        <Weather />
        <Forecast />
      </div>
    )
  }

}

export default Home;