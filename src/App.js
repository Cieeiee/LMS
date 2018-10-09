import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import AdminLogin from './pages/login/index'
import NotFound from './pages/notFound/index'
import Admin from './pages/admin/index'
import Reader from './pages/reader/index'
import Librarian from './pages/librarian/index'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={AdminLogin} />
          <Route path='/admin' component={Admin} />
          <Route path='/reader' component={Reader} />
          <Route path='/librarian' component={Librarian} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
