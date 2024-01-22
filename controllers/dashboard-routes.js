const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models");
const router = require("express").Router();
require("dotenv").config();

// end point is /dashboard

// gets all posts that is assoicated with the logged in user
router.get("/", withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
              user_id: req.session.user_id,
            },
            // will return the title, content, and username of the post
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
          const posts = postData.map(post => post.get ({plain: true}))
          res.render('dashboard', {posts, loggedIn: req.session.logged_in, userName: req.session.user_name})
    }
    catch (err) {
        res.status(500).json(err.toString())
    }
});

// implement an edit and create new post function
// user anime-db code for edit window box / create new post box

module.exports = router;
