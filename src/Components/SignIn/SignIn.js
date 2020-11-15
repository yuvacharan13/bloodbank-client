import React, { useContext, useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./SignIn.css";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const SignIn = () => {
  const history = useHistory();

  const { loggedIn, SetLoggedIn, type, SetType } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    history.push("/signuphospital");
  };

  const handleReceiver = () => {
    history.push("/signupreceiver");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      var user = await fetch(
        "https://blood-bank-application.herokuapp.com/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            SetType(data.type);
            localStorage.setItem("bloodbanktoken", data.jwtToken);
            localStorage.setItem("userDetails", JSON.stringify(data.user));
            setLoading(false);
            SetLoggedIn(true);
            if (data.type === "hospital") {
              history.push("/blooddata");
            } else {
              history.push("/dashboard");
            }
          } else {
            setLoading(false);
            setAlert({ display: "flex", message: data.message });
          }
        });
    } catch (err) {
      console.log({ message: err });
      setLoading(false);
    }
  };

  // const [data, setData] = useState({email : '' , password : "" })
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ display: "none", message: "" });

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <h1 className="heading">Blood Bank</h1>
            <p className="para">Donate or get blood here</p>
          </div>
          <div className="shadow p-3 mb-5 bg-white col-md-5 mx-auto">
            <div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group align-items-center justify-content-center">
                    <input
                      className="form-control input-style"
                      name="email"
                      type="email"
                      ref={register}
                      placeholder="Enter email address"
                      required
                    />
                    <input
                      className="form-control input-style"
                      name="password"
                      type="password"
                      ref={register}
                      placeholder="Enter password"
                      required
                    />
                    <input
                      value={loading ? "please wait.." : "Log In"}
                      className="btn btn-primary btn-lg btn-block font-weight-bold"
                      type="submit"
                    />
                  </div>
                  <Alert
                    severity="error"
                    style={{ display: alert.display }}
                    onClose={() => {
                      setAlert({ display: "none" });
                    }}
                  >
                    {alert.message}
                  </Alert>
                </form>
                <div>
                  <a className="forgotpassword" href="">
                    Forgotten password?
                  </a>
                </div>
                <hr />
                <button
                  className="createAcc"
                  onClick={handleClick}
                  disabled={loading}
                >
                  Create an Account for hospital
                </button>
                <button
                  className="createAcc"
                  onClick={handleReceiver}
                  disabled={loading}
                >
                  Create an Account as receiver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
