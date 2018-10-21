import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {AccountBoxOutlined, EmailOutlined, LocalAtmOutlined, PhoneOutlined} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import '../../reader.scss'

const Reader = require('../../components/images/reader.jpg');

export default function ReaderInfo(props) {
    return (
        <Card className="flex-row">
            <CardMedia
                style={{
                    width: 200,
                }}
                image={Reader}
                title="Reader information"
            />
            <CardActionArea onClick={props.handleOpen}>
                <CardContent
                    style={{
                        width: 200,
                    }}
                >
                    <div className="flex-row">
                        <AccountBoxOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.name}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <EmailOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.email}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <PhoneOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.id}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <LocalAtmOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.deposit}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}