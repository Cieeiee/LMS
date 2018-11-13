import React from 'react';
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import * as intl from "react-intl-universal";
import {fetchBookHistory} from "../../../../mock";
import HistoryList from "./component/historyList";

export default class BookHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            lostHistory: [],
            deletedHistory: [],
        }
    }

    classifyHistory = (historyList) => {
        let deletedHistory = [], lostHistory = [];
        for (let h of historyList) {
            let c = h;
            if (h.id && h.id[0] === 'l') {
                // book lost
                c['id'] = c.id.substr(6);
                lostHistory.push(c);
            }
            else {
                deletedHistory.push(c)
            }
        }
        this.setState({lostHistory, deletedHistory})
    }

    async componentDidMount() {
        let historyList = await fetchBookHistory()
        this.classifyHistory(historyList)
    }

    render() {
        return(
            <div className="flex-col">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"history"}
                        lang={this.props.location.search}
                    />
                    <div className="grow">
                        <HistoryList
                            historyList={this.state.deletedHistory}
                            title={intl.get('basic.deletedHistory')}
                            account={intl.get('basic.librarian')}
                        />
                        <HistoryList
                            historyList={this.state.lostHistory}
                            title={intl.get('basic.lostHistory')}
                            account={intl.get('basic.reader')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}