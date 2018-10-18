import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {TopBar} from "./components/TopBar";
import ManageLibrarians from "./manageLibrarians";
import ManageRules from "./manageRules";


export default function Admin(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/admin' exact component={ManageLibrarians}/>
                <Route path='/admin/manageRules' component={ManageRules}/>
            </Switch>
        </BrowserRouter>
    );
}