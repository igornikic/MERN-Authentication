import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import avatar1 from "../../assets/avatars/avatar1.png";
import avatar2 from "../../assets/avatars/avatar2.png";

import {
  updateProfile,
  updateProfileReset,
  clearErrors,
} from "../../features/user/userSlice";

import { loadUser } from "../../features/user/authSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  // Create refs for avatar images
  const avatar1Ref = useRef(null);
  const avatar2Ref = useRef(null);

  // Get auth and user state from redux store
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  // Defines state for formData
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  // Extract name, email and avatar from formData state
  const { name, email } = formData;

  // Set focus on user current avatar on page load
  useEffect(() => {
    if (user.avatar === avatar1) {
      avatar1Ref.current.classList.add("blue-outline");
    } else {
      avatar2Ref.current.classList.add("blue-outline");
    }
  }, [avatar1Ref, avatar2Ref, user]);

  // Update the formData state whenever an input field changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Set the avatar in the formData state
  const handleAvatarClick = (e) => {
    const selectedAvatar = e.target.name === "avatar1" ? avatar1 : avatar2;
    setFormData({ ...formData, avatar: selectedAvatar });
    if (selectedAvatar === avatar1) {
      avatar1Ref.current.classList.add("blue-outline");
      avatar2Ref.current.classList.remove("blue-outline");
    } else {
      avatar2Ref.current.classList.add("blue-outline");
      avatar1Ref.current.classList.remove("blue-outline");
    }
  };

  // Dispatche updateProfile and loadUser actions to the Redux store
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(formData));
    // To update user in redux store
    dispatch(loadUser());
  };

  return (
    <div className="form-style">
      <PageTitle title="Login" />

      {loading && <Loader />}
      {/* ErrorAlert component that displays error message and has a function to clear the error */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {isUpdated && (
        <Alert
          message={"Updated"}
          type={"success"}
          clear={updateProfileReset}
        />
      )}

      <h1>Update Profile</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="avatar-img">
          <label htmlFor="avatar">Avatar</label>
          <img
            tabIndex="0"
            className="selected-image"
            src={avatar1}
            name="avatar1"
            alt="Avatar 1"
            ref={avatar1Ref}
            onClick={handleAvatarClick}
          />
          <img
            tabIndex="0"
            className="selected-image"
            src={avatar2}
            name="avatar2"
            alt="Avatar 2"
            ref={avatar2Ref}
            onClick={handleAvatarClick}
          />
        </div>
        <button type="submit" disabled={loading ? true : false}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
