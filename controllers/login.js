const express = require("express");
const User = require("../models/signUpUser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();
exports.getLoginPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"));
};

exports.getForgetPasswordPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "public", "views", "forgetpassword.html")
  );
};

exports.postForgetPassword = (req, res) => {
  const userEmail = req.body.email;

  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = " {{params.subject}}";
  sendSmtpEmail.htmlContent =
    "<html><body><h1> Click on link to reset password {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = {
    name: "Amlend Jadaun",
    email: "amlendsingh@gmail.com",
  };
  (sendSmtpEmail.to = [{ email: userEmail }]),
    (sendSmtpEmail.params = {
      parameter: "link",
      subject: "Reset Password Of Expense Tracker",
    });

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

exports.postValidiateLogin = async (req, res, next) => {
  const userValidiate = {
    email: req.body.email,
    password: req.body.password,
  };

  function generateWebToken(id) {
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
  }

  try {
    await User.findAll({ where: { email: userValidiate.email } })

      .then((user) => {
        if (user[0].email === userValidiate.email) {
          return user[0];
        }
      })
      .then((user) => {
        bcrypt.compare(userValidiate.password, user.password, (err, result) => {
          if (result === true) {
            return res.status(200).json({
              success: true,
              massage: "User loged successfully",
              token: generateWebToken(user.id),
            });
          } else {
            return res
              .status(500)
              .json({ success: false, message: "Wrong Password" });
          }
        });
      })

      .catch((err) => {
        res.status(404).send("User Not Found 404");
      });
  } catch (err) {
    console.log(err);
  }
};
