import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import {
  forgotPassword,
  clearMessage,
  clearErrors,
} from "../../features/user/forgotPasswordSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  // Get forgotPassword state from redux store
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );

  // Defines state for formData and initializes it with empty string
  const [formData, setFormData] = useState({
    email: "",
  });

  // Extract email from formData state
  const { email } = formData;

  // Update the formData state whenever an input field changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Dispatche forgotPassword action to the Redux store
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(formData));
  };

  return (
    <div className="form-style">
      <PageTitle title="Forgot Password" />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {message && (
        <Alert message={message} clear={clearMessage} type={"success"} />
      )}

      <form onSubmit={onSubmit}>
        <h1>Forgot Password</h1>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
        </div>

        <button type="submit" disabled={loading ? true : false}>
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
