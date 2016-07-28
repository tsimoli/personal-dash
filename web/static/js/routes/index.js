import { IndexRoute, Route }  from 'react-router';
import React                  from 'react';
import MainLayout             from '../layouts/main';
import HomeIndexView          from '../views/home';
import WeatherIndexView       from '../views/weather';

export default function configRoutes(store) {
  return (
    <Route component={MainLayout}>
      <Route path="/" component={HomeIndexView}/>
      <Route path="/weather" component={WeatherIndexView}/>
    </Route>
  );
}
