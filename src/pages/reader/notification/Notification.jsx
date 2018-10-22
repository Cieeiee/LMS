import React from "react";
import "../reader.scss"
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Assignment} from '@material-ui/icons'
import {TopBar} from "../components/TopBar";
import {green} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography/Typography";
import {serverReader} from "../../../mock/config";

const notifications = [
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
];

export default class ReaderNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };
    }

    getNotification = () => {
        fetch(`${serverReader}/showAnnouncement`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    notifications: result.announcements
                });
            })
            .catch(e => alert(e));
    };

    componentDidMount() {
        this.getNotification();
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
                <TopBar loginUser={this.props.match.params.loginUser}/>
                <div className="flex-col mid-div">
                    <div className="flex-row"
                         style={{marginBottom: 10}}
                    >
                        <Typography style={{fontSize: 50, marginLeft: 5}} className="col-mid">
                            Notifications
                        </Typography>
                    </div>
                    <List>
                        {MessageLists}
                    </List>
                </div>
            </React.Fragment>
        );
    }
}

function OneNotification(props) {
    return (
        <ListItem>
            <Avatar
                style={{
                    color: '#fff',
                    backgroundColor: green[500],
                }}
            >
                <Assignment/>
            </Avatar>
            <ListItemText
                primary={props.notification.message}
                secondary={props.notification.timestamp}
            />
        </ListItem>
    );
}