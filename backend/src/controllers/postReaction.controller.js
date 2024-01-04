const db = require("../database");


exports.all = async (req, res) => { // Select all reactions from the database.
  const postComment = await db.postReaction.findAll();

  res.json(postComment);
};

// Select one user's post reaction from the database.
exports.one = async (req, res) => {
  const postComment = await db.postReaction.findByPk(req.params.id);
  res.json(postComment);
};

// Create a reaction in the database.
exports.create = async (req, res) => {
  const postComment = await db.postReaction.create({
    reaction: req.body.reaction,
    email: req.body.email,
    post_id: req.body.post_id
  });

  res.json(postComment);
};

// Select one reaction from the database and delete.
exports.delete = async (req, res) => {
  const postComment = await db.postReaction.findByPk(req.params.id);
  postComment.destroy()
  res.json(postComment);

};