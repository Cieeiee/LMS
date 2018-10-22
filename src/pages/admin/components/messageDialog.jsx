import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import React from "react";

export default function MessageDialog(props) {
    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal:'right'}}
            open={props.open}
            onClose={props.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            autoHideDuration={1500}
            message={
                <span id="message-id">
                    {props.message}
                </span>
            }
        />
    );
}