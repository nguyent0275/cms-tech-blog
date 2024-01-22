const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Comment } = require("../../models");
const router = require("express").Router();
require("dotenv").config();

// endpoint is api/comment

// get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    // creates a comment, uses a string input for the comment and an associated user_id and post_id (this identifies where the comment goes and who it belongs to)
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// update a comment by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.upsert(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// delete a comment by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
