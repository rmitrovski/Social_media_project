const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.email);

  res.json(user);
};



// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const current = new Date();
  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    first_name: req.body.fname,
    last_name: req.body.lname,
    date_of_registration: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
  });

  res.json(user);
};

// Update a profile in the database.
exports.update = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const user = await db.user.findByPk(req.body.email);
  console.log(user)
  // Update profile fields.
  user.email = req.body.email;
  user.password_hash = hash;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.date_of_registration = req.body.date_of_registration;

  await user.save();

  res.json(user);
};



