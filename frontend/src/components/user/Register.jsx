import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";
import avatar1 from "../../assets/avatars/avatar1.png";
import avatar2 from "../../assets/avatars/avatar2.png";

import { register, clearErrors } from "../../features/user/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create refs for avatar images
  const avatar1Ref = useRef(null);
  const avatar2Ref = useRef(null);

  // Defines state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Get auth state from redux store
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Defines state for formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Extract name, email, password from formData state
  const { name, email, password } = formData;

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

  // Dispatche register action to the Redux store
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  // Navigate user to "/" after 2s if he is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isAuthenticated]);

  // Toggle visibility of the password input field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-style">
      <PageTitle title="Register" />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {isAuthenticated && (
        <Alert message={"Registered Successfully!"} type={"success"} />
      )}

      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <span className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
            {showPassword ? (
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="16"
                fill="currentColor"
                className="bi bi-eye password-toggle"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            ) : (
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="16"
                fill="currentColor"
                className="bi bi-eye-slash password-toggle"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            )}
          </span>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
