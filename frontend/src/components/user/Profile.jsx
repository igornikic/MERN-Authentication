import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import { clearErrors } from "../../features/user/authSlice";

const Profile = () => {
  // Get auth state from redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  return (
    <div className="form-style">
      <PageTitle title={`${user.name} Profile`} />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      <div className="row">
        <div className="col">
          <h1>{user.name} Profile</h1>
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div>
            <Link to="/me/update">
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>
        <div className="col">
          <div>
            <h3>Username</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3>Member Since</h3>
            <p>
              {String(user.createdAt)
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </p>
          </div>
          <div>
            <Link to="/password/update">
              <button type="button">Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
