const db = require("../database");


exports.all = async (req, res) => { // Select all comments from the database.
  const postComment = await db.postComment.findAll();

  res.json(postComment);
};

// Select one user's post comments from the database.
exports.one = async (req, res) => {
  const postComment = await db.postComment.findByPk(req.params.id);
  res.json(postComment);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const postComment = await db.postComment.create({
    text: req.body.text,
    email: req.body.email,
    post_id: req.body.post_id
  });

  res.json(postComment);
};

// Select one user comment from the database and delete it.
exports.delete = async (req, res) => {
  const postComment = await db.postComment.findByPk(req.params.id);
  postComment.destroy()
  res.json(postComment);

};