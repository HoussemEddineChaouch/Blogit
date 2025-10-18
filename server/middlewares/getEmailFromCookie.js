function getEmailFromCookie(req, res, next) {
  const email = req.cookies.userEmail;
  if (!email) {
    res.status(400).json({ message: "Your Otp has been expired !" });
  }

  req.userEmail = email;
  next();
}

module.exports = { getEmailFromCookie };
