import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import { AdminLogin, Login } from './pages/login/index'
import * as intl from "react-intl-universal";
import _ from "lodash";
import http from "axios";
import Loading from "./mock/loading";

const NotFound = lazy(() => import('./pages/notFound/index'));
const Admin = lazy(() => import('./pages/admin/index'));
const Reader = lazy(() => import('./pages/reader/index'));
const Librarian = lazy(() => import('./pages/librarian/index'));

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
                // console.log("App locale data", res.data);
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
                  <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path='/' exact component={LinkToGuest}/>
                        <Route path='/login' component={Login} />
                        <Route path='/admin/login' component={AdminLogin} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/reader' component={Reader} />
                        <Route path='/librarian' component={Librarian} />
                        <Route component={NotFound} />
                    </Switch>
                  </Suspense>
                </BrowserRouter>
            </div>
        );
    }
}

class LinkToGuest extends React.Component {

    componentDidMount() {
        window.location.href = "/reader/guest?lang=en-US"
    }

    render() {
        return (
            <div/>
        )
    }
}

export default App;
