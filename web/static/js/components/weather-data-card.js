
import React from 'react';
import Skycons from 'react-skycons';

export default class WeatherDataCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { weatherData }  = this.props;

    var date = new Date(weatherData.time * 1000);
    var dateOptions = {
      month: "numeric",
      weekday: "long",
      day: "numeric"
    };

    return (
          <div className="col s12 m6 l2">
            <div className="card blue-grey lighten-1">
              <span className="card-title">{ date.toLocaleDateString("fi-FI", dateOptions) }</span>
              <div className="card-content black-text">
                <p>Min: <span>{ Number(weatherData.temperatureMin).toFixed(0)} &#x2103;</span></p>
                <p>Max: <span>{ Number(weatherData.temperatureMax).toFixed(0)} &#x2103;</span></p>
                <Skycons color='black' icon={weatherData.icon.toUpperCase().replace(/-/g, "_")} autoplay={false}/>
        <p>{weatherData.summary}</p>
              </div>
            </div>
          </div>
    );
  }
}
