import React from "react";
import profileImage from "../components/images/default_profile_picture.png";
import { FaBell } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white fixed-top shadow p-3 mb-5">
      <div className="container-fluid">
        <a className="navbar-brand text-bold ms-5" href="#">
          Adra Product Studio
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
               <FaBell/>
              </a>
            </li> */}
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Adra
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", marginLeft: "10px" }}
              />
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
