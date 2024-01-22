const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { User, Post, Comment } = require("../../models");
const router = require("express").Router();
require("dotenv").config();

// gets all posts in the database and their associated user's name
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    console.log(postData);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// create a post route
router.post("/", withAuth, async (req, res) => {
  try {
    // creates a post from user input and the stored user id in the session
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// CHECK THIS ROUTE TO SEE IF POST_ID IS BEING STORED CORRECTLY AND CAN BE USED AS AN IDENTIFIER
// update a post route
// uses UPSERT method, which allows the body to be updated and inserted into the database at the same time
router.put("/update", async (req, res) => {
  try {
    // creates an object of things that will be updated
    const postToUpdate = {
      id: req.session.post_id,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    };
    const postData = await Post.upsert(postToUpdate, {
      // uses the object to identify which post will be updated in the database
      // identifies by the logged in user id and post id
      where: {
        id: postToUpdate.post_id,
        user_id: postToUpdate.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: "No post found",
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// delete a post route
// users will be prompted on the front end to type in the tite of the post they want to delete
router.delete("/delete", async (req, res) => {
  try {
    const postData = await Post.destroy({
      // takes the title of the post and the logged in user_id variable to identify which to delete
      where: {
        title: req.body.title,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: "No post found",
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
