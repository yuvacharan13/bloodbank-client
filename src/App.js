import { useEffect, useState } from "react";
import "./App.css";
import { UserContext } from "./UserContext.js";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUpHospital from "./Components/SignUpHospital/SignUpHospital";
import Navbar from "./Components/Navbar/Navbar";
import BloodData from "./Components/BloodData/BloodData"
import "bootstrap/dist/css/bootstrap.css";
import SignUpReceiver from "./Components/SignUpReceiver/SignUpReceiver";
import AddBloodInfo from "./Components/AddBloodInfo/AddBloodInfo";
import Dashboard from "./Components/Dashboard/Dashboard";
import Loading from "./Components/Loading/Loading";
import SampleRequests from "./Components/SampleRequests/SampleRequests";

const App = () => {
  const [loggedIn, SetLoggedIn] = useState(false);
  const [dashboardPage, SetdashboardPage] = useState(true);

  const [type, SetType] = useState("");

  const [receiverName, SetReceiverName] = useState("");

  const [phoneNumber, SetphoneNumber] = useState("");

  useEffect(() => {
    const tokenCheck = localStorage.getItem("bloodbanktoken");
    if (tokenCheck !== null) {
      SetLoggedIn(true);
    }
    console.log(tokenCheck)
  },[])

  return (
    <div className="App">
      <Switch>
        <UserContext.Provider value={{ loggedIn, SetLoggedIn, type, SetType, receiverName, SetReceiverName, dashboardPage, SetdashboardPage, phoneNumber, SetphoneNumber }}>
        <Route path="/signin">
          { loggedIn === true ? (type === "hospital" ? <Redirect to="/blooddata" /> : <Redirect to="/dashboard" />)  : (dashboardPage === true ? <Redirect to="/dashboard" /> : <SignIn />) } 
        </Route>
        <Route path="/signuphospital">
        { loggedIn === true ? (type === "hospital" ? <Redirect to="/blooddata" /> : <Redirect to="/dashboard" />)  : <SignUpHospital /> } 
        </Route>
        <Route path="/signupreceiver">
        { loggedIn === true ? (type === "hospital" ? <Redirect to="/blooddata" /> : <Redirect to="/dashboard" />)  : <SignUpReceiver /> } 
        </Route>
        <Route path="/blooddata">
          { loggedIn === true ? (type === "hospital" ? <Navbar Component={BloodData} /> : <Redirect to="/dashboard" />)  : <Redirect to="/dashboard" /> }
        </Route>
        <Route path="/addbloodinfo">
          { loggedIn === true ? (type === "hospital" ? <Navbar Component={AddBloodInfo} /> : <Redirect to="/dashboard" />)  : <Redirect to="/dashboard" /> }
        </Route>
        <Route path="/samplerequests">
          { loggedIn === true ? (type === "hospital" ? <Navbar Component={SampleRequests} /> : <Redirect to="/dashboard" />)  : <Redirect to="/dashboard" /> }
        </Route>
        <Route path="/dashboard">
        {/* { loggedIn === true ? (type === "receiver" ? <Navbar Component={Dashboard} /> : (type === "hospital" ? <Redirect to="/blooddata" /> : <Navbar Component={Loading} />))  : <Redirect to="/signin" /> } */}
          {type === "receiver" ? <Navbar Component={Dashboard} /> : (loggedIn === true ? (type === "hospital" ? <Redirect to="/blooddata" /> : <Navbar Component={Loading} />) : <Navbar Component={Dashboard} />)   }
        </Route>
          <Redirect from="/" to="/signin" />
        </UserContext.Provider>
      </Switch>
    </div>
  );
};

export default App;
