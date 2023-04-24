import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import { userDetails } from "../../features/user/userDetailsSlice";
import {
  updateUser,
  updateUserReset,
  clearErrors,
} from "../../features/user/userSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  // Get user id
  const { id } = useParams();

  // Get userDetails and user state from redux store
  const { user } = useSelector((state) => state.userDetails);
  const { loading, error, isUpdated } = useSelector((state) => state.user);

  // Defines state for formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Extract name, email, role from formData state
  const { name, email, role } = formData;

  useEffect(() => {
    // If the current user is not the same as the user ID in the URL get userDetails
    if (user && user._id !== id) {
      dispatch(userDetails(id));
    } else {
      // If not, setFormData based on existing user details.
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, dispatch, id]);

  // Update the formData state whenever an input field changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Dispatche updateUser and userDetails action to the Redux store
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ id, userData: formData }));
    // To update userDetails in redux store
    dispatch(userDetails(id));
  };

  return (
    <div className="form-style">
      <PageTitle title="User Details" />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {isUpdated && (
        <Alert
          message={"User Updated Successfully"}
          clear={updateUserReset}
          type={"success"}
        />
      )}

      <form onSubmit={onSubmit}>
        <h1>Update User</h1>
        <div>
          <label htmlFor="name_field">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>

        <div>
          <label htmlFor="email_field">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>

        <div>
          <label htmlFor="role_field">Role</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
