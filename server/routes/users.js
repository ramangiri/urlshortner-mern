const express = require("express");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const router = express.Router();
const {
  hashing,
  hashCompare,
  createJWT,
  createJWTForActivation,
  verifyTokenForActivation,
  createJWTForReset,
  verifyTokenForReset,
} = require("../library/auth");
const User = require("../models/user");

//Sign-up functionality
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  try {
    User.findOne({ email }).exec(async (err, user) => {
      if (user) {
        return res.json({ error: "user already exist." });
      } else {
        const token = await createJWTForActivation({
          name,
          email,
          password,
        });
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let mailOptions = {
          from: `PG <process.env.EMAIL>`,
          to: email,
          subject: "Account Activation Link",
          html: `
          <div style="margin : 0 auto; width: 450px; border:1px solid lightgray; border-radius:5px; padding:1rem; text-align:center;">
      <h1 style="font-size:1rem; color:#2BAE66FF; text-align: left;"> <lead>Dear user,</lead> <br/> <br/>Please click the below button to Activate your Account.</h1>
      <div style="padding:1rem; margin:0.75rem auto; width:400px; height: 300px;">
      <a href="${process.env.CLIENT_URL}/activate-account/${token}">
        <img src="https://s3-eu-west-1.amazonaws.com/eazy3img/activations/activation.jpg" style="width:100%; height:100%; text-decoration:none; cursor: pointer;" alt="activate-account">
      </a>
        </div>
      <a href="${process.env.CLIENT_URL}/activate-account/${token}" style="font-size: 1rem; padding:0.75rem; border:none; border-radius:5px; text-decoration:none; background-color: rgb(76, 175, 75); color: whitesmoke; cursor:pointer;">Activate Now</a>
      </div>
              `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            return res.json({
              message:
                "Email has been sent, kindly follow the instructions to activate you account!",
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Account activation
router.post("/activate-account", verifyTokenForActivation, (req, res) => {
  const { name, email, password } = req.body.auth;
  User.findOne({ email }).exec(async (err, user) => {
    if (user) {
      return res.json({ message: "User with this email already exist" });
    } else {
      const hash = await hashing(password);
      req.body.auth.password = hash;

      let newUser = new User(req.body.auth);
      newUser.save((err, success) => {
        if (err) {
          console.log("error in signup: ", err);
          return res.json({ error: "Error in activating account" });
        } else {
          return res.json({ message: "Signup successful" });
        }
      });
    }
  });
});

//Login functionality
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email }).exec(async (err, user) => {
      if (user) {
        const compare = await hashCompare(password, user.password);
        if (compare) {
          const token = await createJWT({
            email,
            id: user._id,
          });
          return res.status(200).json({
            token,
            message: "Login Success",
          });
        } else {
          return res.json({
            message: "Wrong Password",
          });
        }
      } else {
        return res.json({
          message: "No User Available",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Forget password functionality
router.put("/forget-password", (req, res) => {
  const { email } = req.body;
  try {
    User.findOne({ email }).exec(async (err, user) => {
      if (!user || err) {
        return res.json({
          message: "User with this email does not exist",
        });
      } else {
        const token = await createJWTForReset({
          id: user._id,
        });

        return user.updateOne({ resetLink: token }, async (err, success) => {
          if (err) {
            return res.json({
              error: "Reset password link error",
            });
          } else {
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL,
            pass: process.env.PASSWORD,
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            let mailOptions = {
              from: `PG <process.env.EMAIL>`,
              to: email,
              subject: "Password Reset Link",
              html: `
              <div style="margin : 0 auto; width: 450px; border:1px solid lightgray; border-radius:5px; padding:1rem; text-align:center;">
              <h1 style="font-size:1rem; color:#2BAE66FF; text-align: left;"> <lead>Dear user,</lead> <br/> <br/>Please click the below button to reset your password.</h1>
              <div style="padding:1rem; margin:0.75rem auto; width:400px; height: 300px;">
              <a href="${process.env.CLIENT_URL}/reset-password/${token}">
                <img src="https://thumbs.dreamstime.com/b/forgot-password-lock-keyboard-combination-gray-computer-158933051.jpg" style="width:100%; height:100%; text-decoration:none; cursor: pointer;" alt="Reset-password">
              </a>
                </div>
              <a href="${process.env.CLIENT_URL}/reset-password/${token}" style="font-size: 1rem; padding:0.75rem; border:none; border-radius:5px; text-decoration:none; background-color: rgb(76, 175, 75); color: whitesmoke; cursor:pointer;">Reset Now</a>
              </div>
              `,
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                return res.json({
                  message:
                    "Email has been sent, kindly follow the instructions to reset your password",
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Reset password functionality
router.put("/reset-password", verifyTokenForReset, async (req, res) => {
  const { newPass, resetLink } = req.body;
  User.findOne({ resetLink }, async (err, user) => {
    if (err || !user) {
      return res.json({ error: "User with this token doesn't exist" });
    } else {
      const hash = await hashing(newPass);
      const obj = {
        password: hash,
        resetLink: "",
      };
      user = _.extend(user, obj);
      user.save((err, result) => {
        if (err) {
          return res.json({ error: "Resset passoward error" });
        } else {
          return res
            .status(200)
            .json({ message: "Your password has been changed" });
        }
      });
    }
  });
});

module.exports = router;
