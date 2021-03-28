import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from 'react-dom';

import Auth     from './pages/auth/auth';
import Profile  from './pages/profile/profile'
import Footer   from "./components/footer"

import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/'>
            <Auth />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    )
  }
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,document.getElementById('root'));

