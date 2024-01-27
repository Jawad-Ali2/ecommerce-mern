module.exports = (req, res, next) => {
  // if (!req.headers.cookie.split(";")[1].trim().split("=")[1]) {
  // res.cookie("CSRF-TOKEN", req.csrfToken());
  //   console.log(
  //     "Cookie: ",
  //     req.headers.cookie.split(";")[1].trim().split("=")[1]
  //   );
  // }
  if (req.headers.cookie) {
    const csrfCookie = req.headers.cookie.split(";")[1];

    console.log(csrfCookie);
    if (csrfCookie) {
      const csrfToken = csrfCookie.trim().split("=")[1];

      console.log(csrfToken);

      if (!csrfToken) {
        res.cookie("CSRF-TOKEN", req.csrfToken());

        // console.log("New Token:", newCsrfToken);
      }
    } else {
      // Cookie doesn't exists
      // if (!req.session.loggedIn) {
      res.cookie("CSRF-TOKEN", req.csrfToken());

      console.log("New Cookie Token:");
      // }
    }
  }
  next();
};
