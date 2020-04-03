import React from 'react';
import Landing from './views/Landing';
import Cities from './views/Cities';
import Itineraries from './views/Itineraries';
import Registration from './views/Registration';
import Login from './views/Login';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Favorites from './views/Favorites';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/cities' component={Cities} />
          <Route exact path='/itineraries/bycity/:city_id' component={Itineraries} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/favorites' component={Favorites} />
        </Switch>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
