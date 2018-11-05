import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import * as intl from "react-intl-universal";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";

export default function MonthlyIncome(props) {
    return (
        <div className="grow flex-col">
            <Typography
                style={{fontSize: 50, margin: "20px 0 20px 50px"}}
            >
                {intl.get("basic.monthlyIncome")}
            </Typography>
            <Chart height={400} data={props.dv} scale={props.cols} forceFit>
                <Legend />
                <Axis name="date" />
                <Axis
                    name="income"
                    title={true}
                />
                <Tooltip
                    crosshairs={{
                        type: "y"
                    }}
                />
                <Geom
                    type="line"
                    position="date*income"
                    size={2}
                    color={"city"}
                    shape={"smooth"}
                />
                <Geom
                    type="point"
                    position="date*income"
                    size={4}
                    shape={"circle"}
                    color={"city"}
                    style={{
                        stroke: "#fff",
                        lineWidth: 1
                    }}
                />
            </Chart>
        </div>
    );
}