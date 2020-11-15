import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Table from "react-bootstrap/Table";
import "./BloodData.css";
import Spinner from "react-bootstrap/Spinner";

const BloodData = () => {
  let history = useHistory();

  const [bloodData, SetBloodData] = useState("");

  const { loggedIn, SetLoggedIn, type, SetType } = useContext(UserContext);

  useEffect(() => {
    fetch("https://blood-bank-application.herokuapp.com/getblooddata", {
      method: "GET",
      headers: {
        auth: localStorage.getItem("bloodbanktoken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "authorization failed") {
          console.log(data.message);
        } else {
          SetBloodData(data.data);
        }
      });
  }, []);

  const addBlood = () => {
    history.push("/addbloodinfo");
  };

  return (
    <div>
      <button className="addbutton" onClick={addBlood}>
        Add blood info
      </button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Hospital Name</th>
            <th>Blood Group</th>
            <th>Quantity Available(Units)</th>
          </tr>
        </thead>
        <tbody>
          {bloodData.bloodInfo ? (
            bloodData.bloodInfo.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{bloodData.name}</td>
                  <td>{data.bloodGroup}</td>
                  <td>{data.quantityAvailable}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
              </td>
              <td>
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
              </td>
              <td>
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
              </td>
              <td>
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BloodData;
