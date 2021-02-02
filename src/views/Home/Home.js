import React, {  Component } from "react";

import Search from '../../components/search/search'
import Weather from '../../components/weather/weather'
import Forecast from '../../components/forecast/forecast'



class Home extends Component {

  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      keyword: ""
    }
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
    if (this.props.match.params.keyword !== this.state.keyword) {
      this.setState({ keyword: this.props.match.params.keyword })
    }

  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.match.params.keyword !== this.state.keyword) {
      this.setState({ keyword: this.props.match.params.keyword })
    }

  }  

  render() {
    return (
      <div className="home container">
        <Search search={this.state.keyword} />
        <Weather search={this.state.keyword} />
        <Forecast search={this.state.keyword} />
      </div>
    )
  }

}

export default Home;