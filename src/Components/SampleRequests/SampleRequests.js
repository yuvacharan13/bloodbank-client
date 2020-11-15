import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const SampleRequests = () => {
  let history = useHistory();

  const [samplerequests, Setsamplerequests] = useState("");

  useEffect(() => {
    fetch("https://blood-bank-application.herokuapp.com/getsamplerequests", {
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
          Setsamplerequests(data.data);
        }
      });
  }, []);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Receiver Name</th>
            <th>Blood Group</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {samplerequests.RequestedSamples ? (
            samplerequests.RequestedSamples.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{data.RequestedBy}</td>
                  <td>{data.bloodGroup}</td>
                  <td>{data.phoneNumber}</td>
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

export default SampleRequests;
