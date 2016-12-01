
import React from 'react';
import WeatherDataCard from './weather-data-card';

export default class WeatherDataCards extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { weatherDatas } = this.props;
    var weatherdataCards = weatherDatas.daily.map((weatherData, index) => {
      return <WeatherDataCard key={ index } weatherData={ weatherData }/>;
    });
    return (<div className="center">
            { weatherdataCards }
            </div>);
  }
}
