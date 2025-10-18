const jwt = require("jsonwebtoken");
const { secretkey } = require("../config/db");
const yup = require("yup");

function verifyToken(req, res, next) {
  const authToken = req.cookies.token;
  if (authToken) {
    try {
      const decodePayload = jwt.verify(authToken, process.env.SECRETKEY);
      req.user = decodePayload;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "invalid token, access denied !" });
    }
  } else {
    res.status(401).json({ message: "No Token provided, access denied  !" });
  }
}

//---- Verify Token && Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.userRole == "USER") {
      res.status(403).json({ message: " Not allowed, Only admin!" });
    } else {
      next();
    }
  });
}

//---- Verify Token && Not Admin
function verifyTokenAndAUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: " Not allowed, Only User himself !" });
    }
  });
}

//---- Verify Token && Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (
      req.user.id === req.params.id ||
      req.user.userRole == "USER" ||
      "ADMIN"
    ) {
      next();
    } else {
      res.status(403).json({ message: " Not allowed, Only user or admin !" });
    }
  });
}

async function verifyTokenParams(req, res, next) {
  try {
    const schema = yup.object({
      query: yup.object({
        token: yup.string().required("Token is required"),
      }),
    });

    const { token } = req.query;
    await schema.validate({ query: { token } });

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.resetToken = decoded;

    next();
  } catch (error) {
    res.status(400).json({
      message:
        error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
          ? "Invalid or expired token"
          : error.message,
    });
  }
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAUser,
  verifyTokenAndAuthorization,
  verifyTokenParams,
};
