import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  const { loggedIn, SetLoggedIn, type, SetType, receiverName, SetReceiverName, phoneNumber, SetphoneNumber } = useContext(UserContext);
  useEffect(() => {
    if(loggedIn === true){
    const user = fetch("https://blood-bank-application.herokuapp.com/gettype", {
      method: "GET",
      headers: {
        auth: localStorage.getItem("bloodbanktoken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "authorization failed") {
          // setCurrentUser(null);
        } else {
          SetType(data.type);
          SetReceiverName(data.receiverName);
          if(data.type == "receiver"){
            SetphoneNumber(data.phoneNumber);
          }
        }
      });
    }
  }, [type]);

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
