import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { AdminLogin, Login } from './pages/login/index'
import NotFound from './pages/notFound/index'
import Admin from './pages/admin/index'
import Reader from './pages/reader/index'
import Librarian from './pages/librarian/index'

class App extends Component {
    render() {
        return (
            <div className="flex-col" style={{height: "100%"}}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Login} />
                        <Route path='/admin/login' exact component={AdminLogin} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/reader' component={Reader} />
                        <Route path='/librarian/:id' component={Librarian} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
