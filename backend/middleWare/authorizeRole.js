const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.bio)) {
      return res
        .status(404)
        .json({
          message: `Role:${req.user.bio} is not allowed to access this resource`,
        });
    }
    next();
  };
};
module.exports = authorizeRole;
