// Wraps function with a try-catch block to handle any errors
module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
