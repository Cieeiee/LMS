import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";

export default class Summary extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "summary"})}
                </div>
            </div>
        )
    }
}