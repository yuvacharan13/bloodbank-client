import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./SignUpHospital.css";

const SignUpHospital = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    history.push("/signin");
  };

  const handleReceiver = () => {
    history.push("/signupreceiver");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      var user = await fetch(
        "https://blood-bank-application.herokuapp.com/signuphospital",
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
            setAlert({ display: "flex", message: data.message });
            setTimeout(() => history.push("/signin"), 1000);
          } else {
            setAlert({ display: "flex", message: data.message });
            console.log(data.message);
          }
        });
    } catch (err) {
      console.log({ message: err.message });
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ display: "none", message: "" });

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <h1 className="heading">Blood Bank's Hospital Registration Page</h1>
            <p className="para">Supply the available blood here online</p>
          </div>
          <div className="shadow p-3 mb-5 bg-white col-md-5 mx-auto">
            <div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group align-items-center justify-content-center">
                    <input
                      className="form-control input-style"
                      name="name"
                      type="text"
                      ref={register}
                      placeholder="Enter hospital name"
                      required
                    />
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
                      value={loading ? "please wait.." : "Sign Up"}
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
                <hr />
                <button className="haveAcc" onClick={handleReceiver}>
                  Click here to create receiver Account
                </button>
                <button className="haveAcc" onClick={handleClick}>
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpHospital;
