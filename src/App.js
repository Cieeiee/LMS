import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import AdminLogin from './pages/login/index'
import NotFound from './pages/notFound/index'
import Admin from './pages/admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={AdminLogin} />
          <Route path='/admin' component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
