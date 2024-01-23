const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models");
const router = require("express").Router();
require("dotenv").config();

// end point is '/'

// gets all the post and their titles, content, and user associated with the post
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("home", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// gets the login page
router.get("/login", async (req, res) => {
  try {
    // renders the login handlebars and passes the variables for navbar conditionals
    res.render("login", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// gets the dashboard page
router.get("/dashboard", async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.render('login', {
        loggedIn: req.session.logged_in,
        userName: req.session.user_name,
      })
    } else {
      res.render("dashboard", {
        loggedIn: req.session.logged_in,
        userName: req.session.user_name,
      });
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
});
module.exports = router;
