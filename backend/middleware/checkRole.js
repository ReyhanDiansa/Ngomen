const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.userData.email;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({
        message: "Akses ditolak",
        err: null,
      });
    }
  };
};

module.exports = { checkRole };
