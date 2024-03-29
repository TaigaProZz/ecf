const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

// ignore restriction of cors
app.use(cors({
  origin: process.env.REACT_APP_DOMAIN,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

/***  ROUTES ***/
app.use("/user", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/service", require("./routes/service.route"));
app.use("/feedback", require("./routes/feedback.route"));
app.use("/employee", require("./routes/employee.route"));
app.use("/car", require("./routes/car.route"));
app.use("/carimage", require("./routes/car-image.route"));
app.use("/contact", require("./routes/contact.route"));
app.use("/schedule", require("./routes/schedule.route"));

// start backend server
const port = 3307; 
app.listen(port, () => {
  console.log(`Serveur backend démarré`);
});