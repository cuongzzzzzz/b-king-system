const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const http = require("http")
const { Server } = require("socket.io")

dotenv.config();

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
const allowedOrigins = ['https://vexere1.netlify.app/', "http://localhost:5173",'https://checkout.stripe.com'];

// app.use(cors({
//   origin: "*"
// }))
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, credentials: true
}));
app.use(cookieParser());
app.use(morgan("dev"));

require("./dbs/mongodb.init");

app.use("/api", require("./routes"));

//error handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    stack: error.stack,
    code: statusCode,
    message: error.message || "internal sever error",
  });
});

module.exports = app;
