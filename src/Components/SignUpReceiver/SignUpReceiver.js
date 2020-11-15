import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./SignUpReceiver.css";

const SignUpReceiver = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    access: "",
  });

  const handleClick = () => {
    history.push("/signin");
  };

  const handleHospital = () => {
    history.push("/signuphospital");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      var user = await fetch(
        "https://blood-bank-application.herokuapp.com/signupreceiver",
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
            <h1 className="heading">Blood Bank's Receiver Registration Page</h1>
            <p className="para">Get blood here online</p>
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
                      placeholder="Enter your name"
                      required
                    />
                    <input
                      className="form-control input-style"
                      name="phoneNumber"
                      type="number"
                      ref={register}
                      placeholder="Enter phone number"
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
                    <select
                      name="blood-group"
                      ref={register}
                      style={{ width: "50%", margin: "10px 25%" }}
                      className="custom-select"
                      required
                    >
                      <option value="">Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="O+">O+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="A-">A-</option>
                      <option value="O-">O-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                    </select>
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
                <button className="haveAcc1" onClick={handleHospital}>
                  Click here to create hospital Account
                </button>
                <button className="haveAcc1" onClick={handleClick}>
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

export default SignUpReceiver;
