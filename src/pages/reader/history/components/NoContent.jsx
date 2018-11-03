import { PriorityHighOutlined } from '@material-ui/icons'
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";
import * as intl from "react-intl-universal";

export default function NoContent(props) {
    return (
        <div className="flex-col">
            <Avatar style={{
                padding: 15,
                margin: "40px auto 20px auto",
            }} >
                <PriorityHighOutlined style={{fontSize: 50,}}/>
            </Avatar>
            <div style={{margin: "0 auto 20px auto"}}>
                <Typography
                    color="textSecondary"
                    variant="title"
                >
                    {intl.get("reader.history.noRecords")}
                </Typography>
            </div>
        </div>
    );
}