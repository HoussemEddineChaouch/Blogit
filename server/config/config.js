require("dotenv").config();

const config = {
  stringConnection: process.env.MONGO_CONNECTION_STRING,
  secretKey: process.env.SECRETKEY,
  serverPort: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  host: process.env.HOST,
  portEmail: process.env.PORT_EMAIL,
  service: process.env.SERVICE,
  userAuth: process.env.USER_PASS,
  userPass: process.env.USER_AUTH,
};

module.exports = { config };
