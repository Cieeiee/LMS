import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { AdminLogin, Login } from './pages/login/index'
import NotFound from './pages/notFound/index'
import Admin from './pages/admin/index'
import Reader from './pages/reader/index'
import Librarian from './pages/librarian/index'
import * as intl from "react-intl-universal";
import _ from "lodash";
import http from "axios";

const SUPPOER_LOCALES = [
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    },
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initDone: false,
        }
    }

    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang"
        });
        if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = "en-US";
        }

        http
            .get(`/locales/${currentLocale}.json`)
            .then(res => {
                console.log("App locale data", res.data);
                // init method will load CLDR locale data according to currentLocale
                return intl.init({
                    currentLocale,
                    locales: {
                        [currentLocale]: res.data
                    }
                });
            })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    componentDidMount() {
        this.loadLocales();
    }

    render() {
        return (
            this.state.initDone &&
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
