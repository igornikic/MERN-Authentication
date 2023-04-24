import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import { logout, clearErrors } from "../../features/user/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  // Defines state for dropdown show/hide
  const [isOpen, setIsOpen] = useState(false);

  // Defines state for logout success
  const [isLogout, setIsLogout] = useState(false);

  // Get auth state from redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  // Toggle dropdown show/hide
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Dispatche logout action to the Redux store
  const logoutHandler = () => {
    dispatch(logout());
    setIsLogout(true);
  };
  return (
    <div>
      <PageTitle title="Home" />
      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {isLogout && (
        <Alert message={"Logged Out Successfully"} type={"success"} />
      )}
      {user ? (
        <span className="dropdown" onClick={toggleDropdown}>
          <span className="dropdown-toggle">
            <img
              src={user && user.avatar}
              width="64px"
              height="64px"
              alt="Avatar"
              className="round"
            />
            {isOpen && (
              <ul className="dropdown-menu">
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    <button>Dashboard</button>
                  </Link>
                )}
                <Link to="/me">
                  <li className="dropdown-item">
                    <button>Profile</button>
                  </li>
                </Link>
                <Link to="/" onClick={logoutHandler}>
                  <li className="dropdown-item">
                    <button>Logout</button>
                  </li>
                </Link>
              </ul>
            )}
          </span>
        </span>
      ) : (
        <span className="authenticate">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </span>
      )}
    </div>
  );
};

export default Header;
