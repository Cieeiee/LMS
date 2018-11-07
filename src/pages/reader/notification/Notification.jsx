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
import * as intl from "react-intl-universal";
import {fetchShowNotification} from "../../../mock";

export default class ReaderNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };
    }

    async componentDidMount() {
        const notifications = await fetchShowNotification()
        notifications.sort((x1, x2) => x1.timestamp < x2.timestamp ? 1 : -1)
        this.setState({notifications})
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
                            {intl.get("reader.notification.title")}
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