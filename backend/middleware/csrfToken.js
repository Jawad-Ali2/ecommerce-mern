module.exports = async (req, res, next) => {
  if (!req.cookies["CSRF-TOKEN"]) {
    const cookie = await req.csrfToken();
    console.log(cookie);
    res.cookie("CSRF-TOKEN", cookie);
  }
  next();
};
