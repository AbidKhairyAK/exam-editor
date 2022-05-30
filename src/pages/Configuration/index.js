import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./module.css";

class Configuration extends Component {

  render() {
    return (
      <div className="container">
        <div
          style={{
            borderBottom: "2px solid #CFCFCF",
            marginBottom: 15,
          }}
        >
          <div className="d-flex wrap-tab-pengaturan">
            <NavLink
              className={({ isActive }) => isActive ? 'active d-block mr-4' : 'd-block mr-4'}
              to={`/configuration/event`}
            >
              <span></span>
              Event
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? 'active d-block' : 'd-block'}
              to={`/configuration/ujian`}
            >
              <span></span>
              Ujian
            </NavLink>
          </div>
        </div>

        <Outlet />
      </div>
    );
  }
}

export default Configuration;
