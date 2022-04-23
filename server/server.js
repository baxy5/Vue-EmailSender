const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const PORT = "4000";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Transporter setup with OAuth2
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`Server is ready to take message: ${success}`);
});

// Storing data from the client side
let userData;

// Routing
app.post("/email", (req, res) => {
  res.send("Success");
  userData = req.body;

  // Transporter options
  let mailOptions = {
    from: userData.emailData._value,
    to: process.env.EMAIL,
    subject: userData.nameData._value,
    text: userData.phoneNumberData._value,
  };

  // Sending email -> validation is on client side
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
});

// Server
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
