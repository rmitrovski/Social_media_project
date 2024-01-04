const db = require("../database");

// Select all follows from the database.
exports.all = async (req, res) => {
  const accounts = await db.accountFollow.findAll();
  
  res.json(accounts);
};
// Select one follow from the database.
exports.one = async (req, res) => {
  const accounts = await db.accountFollow.findByPk(req.params.email);

  res.json(accounts);
};

// Create a follow in the database.
exports.create = async (req, res) => {
    const accountFollows = await db.accountFollow.create({
        email: req.body.email,
        followedEmail: req.body.follow_email
    });
  
    res.json(accountFollows);
  };

  // unfollow from the database.
exports.delete = async (req, res) => {
  const accountUnfollow = await db.accountFollow.findByPk(req.params.email);
  accountUnfollow.destroy()



};




