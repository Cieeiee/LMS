import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import * as intl from "react-intl-universal";
import Button from "@material-ui/core/Button/Button";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {BuildOutlined, DeleteOutlined} from "@material-ui/icons";
import {
    fetchAddLocations,
    fetchDeleteLocations,
    fetchShowLocations,
    fetchUpdateLocations,
} from "../../../../mock";
import AddDialog from "./components/addDialog";
import EditDialog from "./components/editDialog";
import DeleteDialog from "./components/deleteDialog";
import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import MessageDialog from "../messageDialog";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";

const isSearched = searchTerm => item =>
    item.location.toUpperCase().includes(searchTerm.toUpperCase())

export default class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            locationList: [],
            openAdd: false,
            openUpdate: false,
            openDelete: false,
            openSnack: false,
            item: undefined,
            formError: undefined,
            processing: false,
            page: 0,
            rowsPerPage: 12,
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            processing: false,
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
            formError: undefined,
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handleAdd = (location) => async () => {
        if (location === undefined || location.length === 0) {
            this.setState({formError: "locationEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchAddLocations(location);
        const locationList = await fetchShowLocations();
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.locationExists')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openAdd: false,
            returnMessage,
            locationList,
        })
    }
    handleUpdate = (location, location_changed) => async () => {
        if (location_changed === undefined || location_changed.length === 0) {
            this.setState({formError: "locationEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchUpdateLocations(location, location_changed);
        const locationList = await fetchShowLocations();
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.locationExists')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openUpdate: false,
            returnMessage,
            locationList,
        })
    }
    handleDelete = (location) => async () => {
        await this.setState({processing: true})
        const eventState = await fetchDeleteLocations(location);
        const locationList = await fetchShowLocations();
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            openDelete: false,
            returnMessage,
            locationList,
        })
    }
    async componentDidMount() {
        const locationList = await fetchShowLocations();
        this.setState({locationList})
    }

    render() {
        const { locationList, rowsPerPage, page } = this.state;
        let locationListToShow = []
        if (locationList) locationListToShow = locationList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, locationListToShow.length - page * rowsPerPage);

        return (
            <div className="flex-col">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    handleSearch={this.handleSearch}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"locations"}
                        lang={this.props.location.search}
                    />
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{intl.get('form.location')}</CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant='contained'
                                            style={{width: 80}}
                                            onClick={this.handleOpen("openAdd", undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {locationListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell numeric>
                                            <IconButton
                                                onClick={this.handleOpen("openUpdate", item)}
                                                // style={{marginRight: 5}}
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            {/*<Button variant='outlined' onClick={this.handleOpen("openDelete", item)}>*/}
                                                {/*{intl.get('basic.delete')}*/}
                                            {/*</Button>*/}
                                            <IconButton
                                                onClick={this.handleOpen("openDelete", item)}
                                            >
                                                <DeleteOutlined/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 57 * emptyRows }}>
                                        <TableCell colSpan={2} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={2}
                                        count={locationListToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        rowsPerPageOptions={[12]}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                            <AddDialog handleClose={this.handleClose("openAdd")}
                                       handleAdd={this.handleAdd}
                                       clearFormError={this.clearFormError}
                                       formError={this.state.formError}
                                       open={this.state.openAdd}
                                       processing={this.state.processing}
                            />
                            <EditDialog
                                handleClose={this.handleClose("openUpdate")}
                                handleUpdate={this.handleUpdate}
                                clearFormError={this.clearFormError}
                                formError={this.state.formError}
                                location={this.state.item}
                                open={this.state.openUpdate}
                                processing={this.state.processing}
                            />
                            <DeleteDialog
                                handleClose={this.handleClose("openDelete")}
                                handleDelete={this.handleDelete}
                                location={this.state.item}
                                open={this.state.openDelete}
                                processing={this.state.processing}
                            />
                            <MessageDialog
                                handleClose={this.handleClose("openSnack")}
                                open={Boolean(this.state.returnMessage)}
                                message={this.state.returnMessage}
                            />
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 14,
        textTransform: 'capitalize',
    },
}))(TableCell);