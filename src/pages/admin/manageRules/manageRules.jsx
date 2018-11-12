import React from "react";
import {TopBar} from "../components/TopBar";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import '../admin.scss'
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { CreateOutlined } from '@material-ui/icons'
import MessageDialog from '../components/messageDialog'
import {serverAdmin} from "../../../mock/config";
import * as intl from "react-intl-universal";
import {fetchAdminShowRules, fetchChangeRules} from "../../../mock";

export default class ManageRules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            returnMessage: undefined,
        };
    };

    getAllRules = async () => {
        const result = await fetchAdminShowRules()
        this.setState({
            deposit: result.deposit,
            fine: result.fine,
            maxReturnTime: result.maxReturnTime,
            maxReserveTime: result.maxReserveTime,
            maxBorrowNum: result.maxBorrowNum,
        });
    };

    async componentDidMount() {
        await this.getAllRules();
    };

    handleChange = which => event => {
        this.setState({[which]: event.target.value})
    };

    handleClose = () => {
        this.setState({
            returnMessage: undefined
        });
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };

    handleClick = (id, value) => async () => {
        if (value === undefined || value.length === 0) {
            this.setState({formError: `${id}empty`});
            return;
        }
        if (!/^\d+(.[0-9]*)?$/.test(value) || /^0+$/.test(value)) {
            this.setState({formError: `${id}incorrect`});
            return;
        }
        if (id >= 2 && (/[.]/.test)) {
            this.setState({formError: `${id}notInteger`});
            return;
        }
        const eventState = await fetchChangeRules(id, value);
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({returnMessage})

    };

    render() {
        return (
            <React.Fragment>
                <TopBar />
                <div className="mid-div flex-col">
                    <div className="flex-row"
                         style={{marginBottom: 10}}
                    >
                        <Typography style={{fontSize: 50, marginLeft: 5}} className="col-mid">
                            {intl.get('admin.rules.title')}
                        </Typography>
                    </div>

                    <Grid container spacing={24}>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>
                                            {intl.get('admin.rules.Deposit')}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {intl.get('admin.rules.Deposit_detail')}
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "0empty" || this.state.formError === "0incorrect"}
                                        label={intl.get('admin.rules.Deposit')}
                                        helperText={this.state.formError === "0empty" ?
                                            intl.get("form.thisEmpty") : this.state.formError === "0incorrect" &&
                                                intl.get("form.thisIncorrect")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    {intl.get('admin.rules.Deposit_unit')}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.deposit}
                                        value={this.state.deposit}
                                        onFocus={this.clearFormError}
                                        onChange={this.handleChange("deposit")}
                                    />
                                    <Button
                                        onClick={this.handleClick(0, this.state.deposit)}
                                    >
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>
                                            {intl.get('admin.rules.Fine')}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {intl.get('admin.rules.Fine_detail')}
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "1empty" || this.state.formError === "1incorrect"}
                                        label={intl.get('admin.rules.Fine')}
                                        helperText={this.state.formError === "1empty" ?
                                            intl.get("form.thisEmpty") : this.state.formError === "1incorrect" &&
                                                intl.get("form.thisIncorrect")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    {intl.get('admin.rules.Fine_unit')}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.fine}
                                        value={this.state.fine}
                                        onChange={this.handleChange("fine")}
                                    />
                                    <Button onClick={this.handleClick(1, this.state.fine)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>
                                            {intl.get('admin.rules.TimeToReturnBook')}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {intl.get('admin.rules.TimeToReturnBook_detail')}
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "2empty"
                                        || this.state.formError === "2incorrect" || this.state.formError === "2notInteger"}
                                        label={intl.get('admin.rules.TimeToReturnBook')}
                                        helperText={this.state.formError === "2empty" ?
                                            intl.get("form.thisEmpty") : this.state.formError === "2incorrect" ?
                                                intl.get("form.thisIncorrect") : this.state.formError === "2notInteger" &&
                                                    intl.get("form.thisNotInteger")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    {intl.get('admin.rules.TimeToReturnBook_unit')}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxReturnTime}
                                        value={this.state.maxReturnTime}
                                        onChange={this.handleChange("maxReturnTime")}
                                    />
                                    <Button onClick={this.handleClick(2, this.state.maxReturnTime)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>
                                            {intl.get('admin.rules.ValidTimeForReserving')}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {intl.get('admin.rules.ValidTimeForReserving_detail')}
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "3empty"
                                        || this.state.formError === "3incorrect" || this.state.formError === "3notInteger"}
                                        label={intl.get('admin.rules.ValidTimeForReserving')}
                                        helperText={this.state.formError === "3empty" ?
                                            intl.get("form.thisEmpty") : this.state.formError === "3incorrect" ?
                                                intl.get("form.thisIncorrect") : this.state.formError === "3notInteger" &&
                                                    intl.get("form.thisNotInteger")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    {intl.get('admin.rules.ValidTimeForReserving_unit')}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxReserveTime}
                                        value={this.state.maxReserveTime}
                                        onChange={this.handleChange("maxReserveTime")}
                                    />
                                    <Button onClick={this.handleClick(3, this.state.maxReserveTime)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>
                                            {intl.get('admin.rules.MaximumBooksToBorrow')}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {intl.get('admin.rules.MaximumBooksToBorrow_detail')}
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "4empty"
                                        || this.state.formError === "4incorrect" || this.state.formError === "4notInteger"}
                                        label={intl.get('admin.rules.MaximumBooksToBorrow')}
                                        helperText={this.state.formError === "4empty" ?
                                            intl.get("form.thisEmpty") : this.state.formError === "4incorrect" ?
                                                intl.get("form.thisIncorrect") : this.state.formError === "4notInteger" &&
                                                    intl.get("form.thisNotInteger")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    {intl.get('admin.rules.MaximumBooksToBorrow_unit')}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxBorrowNum}
                                        value={this.state.maxBorrowNum}
                                        onChange={this.handleChange("maxBorrowNum")}
                                    />
                                    <Button onClick={this.handleClick(4, this.state.maxBorrowNum)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <MessageDialog
                        handleClose={this.handleClose}
                        open={this.state.returnMessage !== undefined}
                        message={this.state.returnMessage}
                    />
                </div>
            </React.Fragment>
        );
    }
}