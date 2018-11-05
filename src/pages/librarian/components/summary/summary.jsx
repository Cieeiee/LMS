import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import DataSet from "@antv/data-set";
import * as intl from "react-intl-universal";
import {fetchLibraryInfo} from "../../../../mock";
import DailyIncome from "./components/daily";
import WeeklyIncome from "./components/weekly";
import MonthlyIncome from "./components/monthly";

const data = [
    {
        date: "Jan",
        deposit: 7.0,
        fine: 3.9
    },
    {
        date: "Feb",
        deposit: 6.9,
        fine: 4.2
    },
    {
        date: "Mar",
        deposit: 9.5,
        fine: 5.7
    },
    {
        date: "Apr",
        deposit: 14.5,
        fine: 8.5
    },
    {
        date: "May",
        deposit: 18.4,
        fine: 11.9
    },
    {
        date: "Jun",
        deposit: 21.5,
        fine: 15.2
    },
    {
        date: "Jul",
        deposit: 25.2,
        fine: 17.0
    },
];

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: undefined,
            weeklyData: undefined,
            monthlyData: undefined,
        }
    }

    async componentDidMount() {
        let dailyData = await fetchLibraryInfo(0)
        let weeklyData = await fetchLibraryInfo(1)
        let monthlyData = await fetchLibraryInfo(2)
        const dailyDS = new DataSet();
        dailyData = dailyDS.createView().source(dailyData)
        const weeklyDS = new DataSet();
        weeklyData = weeklyDS.createView().source(weeklyData)
        const monthlyDS = new DataSet();
        monthlyData = monthlyDS.createView().source(monthlyData)

        dailyData.transform({
            type: "fold",
            fields: ["totalDeposit", "totalFine"],
            key: "city",
            value: "income",
        });
        weeklyData.transform({
            type: "fold",
            fields: ["totalDeposit", "totalFine"],
            key: "city",
            value: "income",
        });
        monthlyData.transform({
            type: "fold",
            fields: ["totalDeposit", "totalFine"],
            key: "city",
            value: "income",
        });
        this.setState({dailyData, weeklyData, monthlyData})
    }

    render() {
        const cols = {
            income: {
                range: [0, 1],
                alias: intl.get("basic.income")
            },
            date: {
                alias: intl.get("basic.date")
            }
        };

        return (
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "summary"})}
                    <div className="grow flex-col">
                        <DailyIncome dv={this.state.dailyData} cols={cols}/>
                        <WeeklyIncome dv={this.state.weeklyData} cols={cols}/>
                        <MonthlyIncome dv={this.state.monthlyData} cols={cols}/>
                    </div>
                </div>
            </div>
        )
    }
}