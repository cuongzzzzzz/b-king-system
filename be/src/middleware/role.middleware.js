const adminRequired = async (req, res, next) => {
  const role = req.role;
  if (role == 2) throw new Error("Ban khong co quyen truy cap");
  if (role == 1) return next();
};

module.exports = { adminRequired };
