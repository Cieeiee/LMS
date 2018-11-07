import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import DataSet from "@antv/data-set";
import * as intl from "react-intl-universal";
import {fetchLibraryInfo} from "../../../../mock";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import Typography from "@material-ui/core/Typography/Typography";
import IncomeChart from "./components/incomeChart";
import BookChart from "./components/bookChart";
import AccountChart from "./components/accountChart";

function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: undefined,
            weeklyData: undefined,
            monthlyData: undefined,
            whichIncomeTab: 0,
            whichBookTab: 0,
            whichAccountTab: 0
        }
    }

    handleChangeTab = (which) => (event, value) => {
        this.setState({[which]: value})
    }

    getIncome = (data) => {
        const DS = new DataSet();
        let dv = deepClone(data)
        dv = DS.createView().source(dv)
        dv.transform({
            type: "rename",
            map: {
                totalDeposit: intl.get("basic.deposit"),
                totalFine: intl.get("basic.fine"),
                numBorrowedBook: intl.get("basic.numBorrowedBook"),
                numReturnedBook: intl.get("basic.numReturnedBook"),
                numCreateAccount: intl.get("basic.numCreateAccount"),
                numDeleteAccount: intl.get("basic.numDeleteAccount")
            },
        }).transform({
            type: "pick",
            fields: ['date', intl.get("basic.deposit"), intl.get("basic.fine")]
        }).transform({
            type: "fold",
            fields: [intl.get("basic.deposit"), intl.get("basic.fine")],
            key: "type",
            value: "value",
        })
        return dv
    }
    getBook = (data) => {
        const DS = new DataSet();
        let dv = deepClone(data)
        dv = DS.createView().source(dv)
        dv.transform({
            type: "rename",
            map: {
                totalDeposit: intl.get("basic.deposit"),
                totalFine: intl.get("basic.fine"),
                numBorrowedBook: intl.get("basic.numBorrowedBook"),
                numReturnedBook: intl.get("basic.numReturnedBook"),
                numCreateAccount: intl.get("basic.numCreateAccount"),
                numDeleteAccount: intl.get("basic.numDeleteAccount")
            },
        }).transform({
            type: "pick",
            fields: ['date', intl.get("basic.numBorrowedBook"), intl.get("basic.numReturnedBook")]
        }).transform({
            type: "fold",
            fields: [intl.get("basic.numBorrowedBook"), intl.get("basic.numReturnedBook")],
            key: "type",
            value: "value",
        })
        return dv
    }
    getAccount = (data) => {
        const DS = new DataSet();
        let dv = deepClone(data)
        dv = DS.createView().source(dv)
        dv.transform({
            type: "rename",
            map: {
                totalDeposit: intl.get("basic.deposit"),
                totalFine: intl.get("basic.fine"),
                numBorrowedBook: intl.get("basic.numBorrowedBook"),
                numReturnedBook: intl.get("basic.numReturnedBook"),
                numCreateAccount: intl.get("basic.numCreateAccount"),
                numDeleteAccount: intl.get("basic.numDeleteAccount")
            },
        }).transform({
            type: "pick",
            fields: ['date', intl.get("basic.numCreateAccount"), intl.get("basic.numDeleteAccount")]
        }).transform({
            type: "fold",
            fields: [intl.get("basic.numCreateAccount"), intl.get("basic.numDeleteAccount")],
            key: "type",
            value: "value",
        })
        return dv
    }

    handleData = (data, which) => {
        let income = this.getIncome(data)
        let book = this.getBook(data)
        let account = this.getAccount(data)

        console.log(income)
        console.log(book)
        console.log(account)
        this.setState({
            [`${which}Income`]: income,
            [`${which}Book`]: book,
            [`${which}Account`]: account,
        })
    }

    async componentDidMount() {
        let dailyData = await fetchLibraryInfo(0)
        let weeklyData = await fetchLibraryInfo(1)
        let monthlyData = await fetchLibraryInfo(2)
        this.handleData(dailyData, "daily")
        this.handleData(weeklyData, 'weekly')
        this.handleData(monthlyData, 'monthly')
    }

    render() {
        return (
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"summary"}/>
                    <div className="grow flex-col">
                        <Paper style={{margin: "20px 20px 0 20px", padding: "10px 20px 0 20px"}}>
                            <div className="flex-col">
                                <Typography style={{margin: "0 auto 0 auto", fontSize: 50}}>
                                    {intl.get('basic.incomeTitle')}
                                </Typography>
                                <Tabs
                                    value={this.state.whichIncomeTab}
                                    onChange={this.handleChangeTab("whichIncomeTab")}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                    className="grow"
                                >
                                    <Tab label={intl.get('basic.daily')} />
                                    <Tab label={intl.get('basic.weekly')} />
                                    <Tab label={intl.get('basic.monthly')} />
                                </Tabs>
                                {this.state.whichIncomeTab === 0 && <IncomeChart dv={this.state.dailyIncome}/>}
                                {this.state.whichIncomeTab === 1 && <IncomeChart dv={this.state.weeklyIncome}/>}
                                {this.state.whichIncomeTab === 2 && <IncomeChart dv={this.state.monthlyIncome}/>}
                            </div>
                        </Paper>

                        <Paper style={{margin: "20px 20px 0 20px", padding: "10px 20px 0 20px"}}>
                            <div className="flex-col">
                                <Typography style={{margin: "0 auto 0 auto", fontSize: 50}}>
                                    {intl.get('basic.bookTitle')}
                                </Typography>
                                <Tabs
                                    value={this.state.whichBookTab}
                                    onChange={this.handleChangeTab("whichBookTab")}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                    className="grow"
                                >
                                    <Tab label={intl.get('basic.daily')} />
                                    <Tab label={intl.get('basic.weekly')} />
                                    <Tab label={intl.get('basic.monthly')} />
                                </Tabs>
                                {this.state.whichBookTab === 0 && <BookChart dv={this.state.dailyBook}/>}
                                {this.state.whichBookTab === 1 && <BookChart dv={this.state.weeklyBook}/>}
                                {this.state.whichBookTab === 2 && <BookChart dv={this.state.monthlyBook}/>}
                            </div>
                        </Paper>

                        <Paper style={{margin: "20px 20px 0 20px", padding: "10px 20px 0 20px"}}>
                            <div className="flex-col">
                                <Typography style={{margin: "0 auto 0 auto", fontSize: 50}}>
                                    {intl.get('basic.accountTitle')}
                                </Typography>
                                <Tabs
                                    value={this.state.whichAccountTab}
                                    onChange={this.handleChangeTab("whichAccountTab")}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                    className="grow"
                                >
                                    <Tab label={intl.get('basic.daily')} />
                                    <Tab label={intl.get('basic.weekly')} />
                                    <Tab label={intl.get('basic.monthly')} />
                                </Tabs>
                                {this.state.whichAccountTab === 0 && <AccountChart dv={this.state.dailyAccount}/>}
                                {this.state.whichAccountTab === 1 && <AccountChart dv={this.state.weeklyAccount}/>}
                                {this.state.whichAccountTab === 2 && <AccountChart dv={this.state.monthlyAccount}/>}
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}