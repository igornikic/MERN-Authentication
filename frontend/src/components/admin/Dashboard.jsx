import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import { allUsers, clearErrors } from "../../features/user/allUsersSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Get allUsers state from redux store
  const { users, loading, error } = useSelector((state) => state.allUsers);

  // Get all users on component mount
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="form-style">
      <PageTitle title="Dashboard" />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}

      <h1>Dashboard</h1>
      <div>
        Users <b>{users && users.length}</b>
        <Link to="/admin/users">
          <span> View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
