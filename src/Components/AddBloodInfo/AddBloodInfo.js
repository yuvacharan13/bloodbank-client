import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const AddBloodInfo = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      var user = await fetch(
        "https://blood-bank-application.herokuapp.com/addbloodinfo",
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
        setTimeout(() => history.push("/blooddata"), 600);
      } else {
        console.log(user.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="shadow p-3 mb-5 bg-white col-md-5 mx-auto">
            <div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group align-items-center justify-content-center">
                    <select
                      name="bloodGroup"
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
                      className="form-control input-style"
                      name="quantityAvailable"
                      type="number"
                      ref={register}
                      placeholder="Quantity Available"
                      required
                    />
                    <input
                      value="Add Blood Info"
                      className="btn btn-primary btn-lg btn-block font-weight-bold"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBloodInfo;
