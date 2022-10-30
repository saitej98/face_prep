import React from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { LoadingPosts } from "../LoadingPosts";
import {Posts} from "../Posts"
const _ = require("lodash");

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      board: [],
      boardItem: "",
      toggle: false,
      submit: true,
      logout: false,
      loggedInUserObj: {},
    };
  }

  onLogoutYes = () => {
    this.setState({ submit: false });
    this.setState({ toggle: true });
    const userObj = JSON.parse(
      localStorage.getItem(_.get(this.state.loggedInUserObj, "userName", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(
      _.get(this.state.loggedInUserObj, "userName", ""),
      JSON.stringify(userObj)
    );
  };

  onLogout = () => {
    this.setState({
      logout: !this.state.logout,
    });
  };

  componentDidMount() {
    const loggedInUserName = _.get(this.props.location, "state.userName", {});
    this.setState({
      loggedInUserObj: JSON.parse(localStorage.getItem(loggedInUserName)),
    });
  }

  render() {
    const localUname = `${_.get(
      this.state.loggedInUserObj,
      "firstName",
      ""
    )} ${_.get(this.state.loggedInUserObj, "lastName", "")}`;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item active text-right"
                  onClick={this.onLogout}
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.onLogout}
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <h1 className="mt-4">HELLO {localUname}</h1>
          <p>Welcome to DashBoard</p>
          <Posts />
        </div>
        {!this.state.submit ? <Redirect to={`/`} /> : null}
        {this.state.logout ? (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={this.onLogoutYes}
            onCancel={this.onLogout}
            focusCancelBtn
          ></SweetAlert>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DashBoard;
