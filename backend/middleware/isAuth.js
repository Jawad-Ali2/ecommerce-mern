module.exports = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(400).json({ message: "User not authenticated" });
  }
  next();
};
