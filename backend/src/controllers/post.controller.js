const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();
  
  res.json(posts);
};
// Select one post from the database.
exports.one = async (req, res) => {
  const post = await db.post.findByPk(req.params.post_id);

  res.json(post);
};


// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    email: req.body.email
  });

  res.json(post);
};

// Update a post in the database.
exports.update = async (req, res) => {
  const post = await db.post.findByPk(req.body.post_id);
    post.post_id = req.body.post_id,
    post.text = req.body.text,
    post.email = req.body.email,


  await post.save();

  res.json(post);
};

// Select one post from the database and delete it.
exports.delete = async (req, res) => {
  const post = await db.post.findByPk(req.params.post_id);
  post.destroy()

};