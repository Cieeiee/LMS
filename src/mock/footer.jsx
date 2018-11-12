import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import '../App.css'

export default function ApplicationFooter(props) {
    return (
        <div className="footer">
            <div className="flex-row" style={{marginLeft: "auto", marginRight: "auto"}}>
                <Typography
                    color="textSecondary"
                    style={{marginRight: 10}}
                >
                    copyright
                </Typography>
                <Typography>
                    @bibliosoft
                </Typography>
            </div>
            <div style={{margin: "5px auto 0 auto"}}>
                <Typography>
                    Currently v0.5. Released under the MIT License.
                </Typography>
            </div>

        </div>
    );
}