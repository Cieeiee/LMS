import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ManageLibrarians from "./manageLibrarians/manageLibrarians";
import ManageRules from "./manageRules/manageRules";
import ApplicationFooter from "../../mock/footer";

export default function Admin(props) {
    return (
        <div className="flex-col grow">
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' exact component={ManageLibrarians}/>
                    <Route path='/admin/manageRules' component={ManageRules}/>
                </Switch>
            </BrowserRouter>
            <div className="grow" />
            <ApplicationFooter/>
        </div>
    );
}