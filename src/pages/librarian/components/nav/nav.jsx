import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import {
    BookOutlined,
    AccountCircleOutlined,
    HistoryOutlined,
    NotificationsOutlined,
    EqualizerOutlined,
    SubtitlesOutlined,
} from '@material-ui/icons'
import {Link} from "react-router-dom";
import * as intl from "react-intl-universal";

export default props =>
    <List style={{width: '250px', height: '100%', borderRight: '1px solid #cccccc'}}>
        <ListItem
            button
            selected={props.whichFunction === "books"}
            component={Link} to={`/librarian/${props.loginUser}/books`}
        >
            <BookOutlined/>
            <ListItemText primary={intl.get('librarian.nav.books')} />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "categories"}
            component={Link} to={`/librarian/${props.loginUser}/categories`}
        >
            <SubtitlesOutlined/>
            <ListItemText primary={intl.get('librarian.nav.categories')} />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "readers"}
            component={Link} to={`/librarian/${props.loginUser}/readers`}
        >
            <AccountCircleOutlined/>
            <ListItemText primary={intl.get('librarian.nav.readers')} />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "history"}
            component={Link} to={`/librarian/${props.loginUser}/history`}
        >
            <HistoryOutlined/>
            <ListItemText primary={intl.get('librarian.nav.deleteHistory')} />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "notifications"}
            component={Link} to={`/librarian/${props.loginUser}/notifications`}
        >
            <NotificationsOutlined/>
            <ListItemText primary={intl.get('librarian.nav.notifications')} />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "summary"}
            component={Link} to={`/librarian/${props.loginUser}/summary`}
        >
            <EqualizerOutlined/>
            <ListItemText primary={intl.get('librarian.nav.summary')} />
        </ListItem>
    </List>