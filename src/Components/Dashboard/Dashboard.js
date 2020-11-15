import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./Dashboard.css";
import Spinner from "react-bootstrap/Spinner";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

// const sample = [
//   ['Frozen yoghurt', 159, 6.0, 24, 4.0],
//   ['Ice cream sandwich', 237, 9.0, 37, 4.3],
//   ['Eclair', 262, 16.0, 24, 6.0],
//   ['Cupcake', 305, 3.7, 67, 4.3],
//   ['Gingerbread', 356, 16.0, 49, 3.9],
// ];

export default function Dashboard() {
  let history = useHistory();
  const [availableSamples, SetAvailableSamples] = useState([]);
  const {
    receiverName,
    SetReceiverName,
    loggedIn,
    dashboardPage,
    SetdashboardPage,
    phoneNumber,
    SetphoneNumber,
  } = useContext(UserContext);

  let rows = [];
  let randomSelection = [];
  let name = "";
  let button = "";
  let id = "";
  let key = 0;
  let email = "";
  let count = 1;
  let slNo = "";

  const handleButton = async (id) => {
    if (loggedIn !== true) {
      SetdashboardPage(false);
      history.push("/signin");
    } else {
      const data = {
        name: rows[id].name,
        email: rows[id].email,
        phoneNumber: phoneNumber,
        bloodGroup: rows[id].bloodGroup,
        quantityAvailable: rows[id].quantityAvailable,
        receiverName: receiverName,
      };
      try {
        var user = await fetch(
          "https://blood-bank-application.herokuapp.com/sendsamplereq",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("bloodbanktoken"),
            },
            body: JSON.stringify(data),
          }
        ).then((res) => res.json());
        if (user.message === "success") {
          alert(`Sample request Sent to ${name.name}`);
        } else {
          console.log(user.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  for (let i = 0; i < availableSamples.length; i++) {
    randomSelection = availableSamples[i].bloodInfo;
    name = { name: availableSamples[i].name };
    email = { email: availableSamples[i].email };
    for (var j = 0; j < randomSelection.length; j++) {
      id = { id: key };
      slNo = { slNo: count };
      button = {
        button: (
          <button
            className="reqbutton"
            onClick={handleButton.bind(this, id.id)}
          >
            Request Sample
          </button>
        ),
      };
      rows.push({
        ...slNo,
        ...id,
        ...name,
        ...email,
        ...button,
        ...randomSelection[j],
      });
      key++;
      count++;
    }
  }

  useEffect(() => {
    const user = fetch(
      "https://blood-bank-application.herokuapp.com/availablesamples",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "authorization failed") {
        } else {
          SetAvailableSamples(data.data);
        }
      });
  }, []);

  return (
    <Paper style={{ height: "90%", width: "80%" }} className="container shadow">
      {rows.length > 0 ? (
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          columns={[
            {
              width: 100,
              label: "#",
              dataKey: "slNo",
            },
            {
              width: 200,
              label: "hospital Name",
              dataKey: "name",
            },
            {
              width: 200,
              label: "blood Group",
              dataKey: "bloodGroup",
            },
            {
              width: 200,
              label: "Quantity Available\u00A0(units)",
              dataKey: "quantityAvailable",
            },
            {
              width: 300,
              label: "Request Blood Sample",
              dataKey: "button",
              numeric: true,
            },
          ]}
        />
      ) : (
        <div>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      )}
    </Paper>
  );
}
