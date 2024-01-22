const router = require("express").Router();
// helper function for checking is user is logged in, if not redirects to the login page
const withAuth = require("../../utils/auth");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
require('dotenv').config();

// application end point is /api/user

// gets all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

// create a user
router.post("/", async (req, res) => {
  try {
    // checking for empty fields and returning appropriate message corresponding to the missing field
    if (!newUser.email) {
      res.status(400).json({
        messae: "Please enter a valid email",
      });
    } else if (!newUser.username) {
      res.status(400).json({
        message: "Please enter a valid username",
      });
    } else if (!newUser.password) {
      res.status(400).json({
        message: "Please enter a valid password",
      });
    } else {
      const userData = await User.create(req.body);

      // saves these variables for later use when the user is created
      req.session.save(() => {
        (req.session.user_id = userData.id),
          (req.session.logged_in = true),
          (req.session.user_name = userData.username);

        res.status(200).json(userData);
        console.log(req.session);
      });
    }
  } catch (err) {
    const errors = err.errros.map((x) => x.path);

    // serves the proper error depending on the situation
    if (errors.indexOf("username") !== -1) {
      res.status(400).json({ message: "This username has been taken" });
    } else if (errors.indexOf("email") !== -1) {
      res.status(400).json({ message: "Email is unavailable to use" });
    } else if (errors.indexOf("password") !== -1) {
      res
        .status(400)
        .json({ message: "This password does not meet the requirements" });
    }
  }
});

// user login route
router.post("/login", async (req, res) => {
  try {
    // finds user by email
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "Login failed, Please try again" });
      return;
    }
    // checks the input vs the hashed password in the database
    // password hashing is done on the model's side
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ massage: "Incorrect email or password, please try again" });
      return;
    }
    // saves these variables when user is logged in
    (req.session.user_id = userData.id),
      (req.session.logged_in = true),
      (req.session.user_name = userData.username);

    res.json({
      user: userData,
      message: "Your are now logged in!",
    });
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

// user logout route
router.post("/logout", withAuth, (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

// deletes user by id
router.delete("/delete", withAuth, async (req, res) => {
  try {
    // delete the user by their id stored in the database
    const userData = await User.destroy({
      where: {
        id: req.session.user_id,
      },
    });
    // also logs the user out
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.toString())
  }
});

module.exports = router;