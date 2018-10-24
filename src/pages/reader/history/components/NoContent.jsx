import { PriorityHighOutlined } from '@material-ui/icons'
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";

export default function NoContent(props) {
    return (
        <div className="flex-col">
            <Avatar style={{
                padding: 15,
                margin: "20px auto 20px auto",
            }} >
                <PriorityHighOutlined style={{fontSize: 50,}}/>
            </Avatar>
            <div style={{margin: "0 auto 20px auto"}}>
                <Typography
                    color="textSecondary"
                    variant="title"
                >
                    No records founded.
                </Typography>
            </div>
        </div>
    );
}