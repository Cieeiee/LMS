import React from "react";
import "./reader.scss"
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { Assignment } from '@material-ui/icons'
import {TopBar} from "./components/TopBar";
import {green} from "@material-ui/core/colors";

export default class ReaderNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [
                {
                    timestamp: "Jan 9, 2014",
                    message: "The time you have to return the book has been changed to five month"
                },
                {
                    timestamp: "Jan 9, 2014",
                    message: "The time you have to return the book has been changed to five month"
                },
                {
                    timestamp: "Jan 9, 2014",
                    message: "The time you have to return the book has been changed to five month"
                },
                {
                    timestamp: "Jan 9, 2014",
                    message: "The time you have to return the book has been changed to five month, " +
                        "The time you have to return the book has been changed to five month, " +
                        "The time you have to return the book has been changed to five month"
                }
            ]
        };
    }

    getNotification = () => {
        fetch('/reader/showAnnotation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reader_id: this.props.readerID,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    notifications: result.annotations
                });
            })
            .catch(e => alert(e));
    };

    componentDidMount() {
        // this.getNotification()
    }

    render() {
        const MessageLists = this.state.notifications.map(notification =>
            <OneNotification
                key={notification.timestamp}
                notification={notification}
            />
        );
        return (
            <React.Fragment>
                <TopBar/>
                <div
                    className={"flex-col" + " " + "mid-div"}
                >
                    <List>
                        {MessageLists}
                    </List>
                </div>
            </React.Fragment>
        );
    }
}

class OneNotification extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <ListItem>
                <Avatar
                    style={{
                        color: '#fff',
                        backgroundColor: green[500],
                    }}
                >
                    <Assignment />
                </Avatar>
                <ListItemText
                    primary={this.props.notification.message}
                    secondary={this.props.notification.timestamp}
                />
            </ListItem>
        );
    }
}