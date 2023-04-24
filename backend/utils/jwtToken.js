const sendToken = (user, statusCode, res) => {
  // Get user token
  const token = user.getJwtToken();

  const options = {
    // Set cookie expires time
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    // Prevent client-side scripts from accessing data
    HttpOnly: true,
    Path: "/",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
    options,
  });
};

module.exports = sendToken;
