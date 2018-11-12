import React from 'react';
import * as intl from "react-intl-universal";
import {Axis, Chart, Geom, Label, Legend, Tooltip} from "bizcharts";

export default function IncomeChart(props) {
    const cols = {
        value: {
            range: [0, 1],
            alias: intl.get("basic.incomeUnit")
        },
        date: {
            alias: intl.get("basic.date")
        }
    };

    return (
        <div className="flex-col">
            <Chart height={400} padding={80} data={props.dv} scale={cols} forceFit>
                <Legend name="value" title={{fontSize: '20'}}/>
                <Axis name="date" />
                <Axis
                    name="value"
                    title={true}
                />
                <Tooltip
                    crosshairs={{
                        type: "y"
                    }}
                />
                <Geom
                    type="line"
                    position="date*value"
                    size={2}
                    color={"type"}
                    shape={"smooth"}
                />
                <Geom
                    type="point"
                    position="date*value"
                    size={4}
                    shape={"circle"}
                    color={"type"}
                    style={{
                        stroke: "#fff",
                        lineWidth: 1
                    }}
                >
                    <Label content={["date*value", (date, value)=>{
                        return `${value}`;
                    }]}
                    />
                </Geom>
            </Chart>
        </div>
    );
}