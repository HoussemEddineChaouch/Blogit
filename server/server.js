const express = require("express");
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
const { connectDB } = require("./config/db");
const { config } = require("./config/config");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");
app.use("/images", express.static("images"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/authRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
const blogRoutes = require("./routes/blogsRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const userRoutes = require("./routes/usersRoutes");
const geminiRoutes = require("./routes/geminiRoutes");

app.use("/blogit/apiv1/auth/", authRoutes);
app.use("/blogit/apiv1/auth/otp", resetPasswordRoutes);
app.use("/blogit/apiv1/blogs", blogRoutes);
app.use("/blogit/apiv1/comments", commentRoutes);
app.use("/blogit/apiv1/users", userRoutes);
app.use("/blogit/apiv1/gemini", geminiRoutes);

connectDB();

app.listen(config.serverPort, () =>
  console.log(`🚀 Server running on port ${config.serverPort}`)
);
