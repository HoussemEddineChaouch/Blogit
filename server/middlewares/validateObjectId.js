const mongoose = require("mongoose");

function validateID(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "invalid ID !" });
  }
  next();
}
module.exports = { validateID };
