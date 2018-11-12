import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './librarian.scss';

const Books = React.lazy(() => import('./components/books/books.jsx'))
const ApplicationFooter = React.lazy(() => import("../../mock/footer"))
const BookDetails = React.lazy(() => import("./components/bookDetail/details"))
const Readers = React.lazy(() => import("./components/readers/readers"))
const BookHistory = React.lazy(() => import("./components/history/bookHistory"))
const LibrarianNotifications = React.lazy(() => import("./components/notifications/notifications"))
const Categories = React.lazy(() => import("./components/categories/categories"))
const Summary = React.lazy(() => import("./components/summary/summary"))
const Locations = React.lazy(() => import("./components/locations/locations"))
const NotFound = React.lazy(() => import('./../notFound/index'))

export default class Librarian extends React.Component {
    render() {
        return (
            <div style={{width: '100%', height: '100%'}} className="flex-col">
                <div className="grow">
                    <BrowserRouter>
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path='/librarian/:loginUser/books' exact component={Books}/>
                            <Route path='/librarian/:loginUser/books/:isbn' exact component={BookDetails}/>
                            <Route path='/librarian/:loginUser/categories' exact component={Categories}/>
                            <Route path='/librarian/:loginUser/locations' exact component={Locations}/>
                            <Route path='/librarian/:loginUser/readers' exact component={Readers}/>
                            <Route path='/librarian/:loginUser/history' exact component={BookHistory}/>
                            <Route path='/librarian/:loginUser/notifications' exact component={LibrarianNotifications}/>
                            <Route path='/librarian/:loginUser/summary' exact component={Summary}/>
                            <Route component={NotFound} />
                        </Switch>
                      </React.Suspense>
                    </BrowserRouter>
                </div>
                <ApplicationFooter/>
            </div>
        );
    }
};