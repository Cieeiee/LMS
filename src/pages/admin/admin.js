import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Loading from "../../mock/loading";

const ManageLibrarians = React.lazy(() => import('./manageLibrarians/manageLibrarians'));
const ManageRules = React.lazy(() => import('./manageRules/manageRules'));
const ApplicationFooter = React.lazy(() => import('../../mock/footer'));
const NotFound = React.lazy(() => import('./../notFound/notFound'));

export default function Admin(props) {
    return (
        <div className="flex-col grow">
            <BrowserRouter>
              <React.Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path='/admin' exact component={ManageLibrarians}/>
                    <Route path='/admin/manageRules' exact component={ManageRules}/>
                    <Route component={NotFound}/>
                </Switch>
              </React.Suspense>
            </BrowserRouter>
            <div className="grow" />
            <ApplicationFooter/>
        </div>
    );
}