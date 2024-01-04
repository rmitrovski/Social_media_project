const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.postReaction = require("./models/postReaction.js")(db.sequelize, DataTypes);
db.postComment = require("./models/postComment.js")(db.sequelize, DataTypes);
db.accountFollow = require("./models/accountFollow.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.postReaction.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false, primaryKey: true } });
db.postReaction.belongsTo(db.post, { foreignKey: { name: "post_id", allowNull: false, primaryKey: true } });
db.postComment.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false, primaryKey: true } });
db.postComment.belongsTo(db.post, { foreignKey: { name: "post_id", allowNull: false, primaryKey: true } });
db.accountFollow.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false, as: "userEmail", primaryKey: true } });
db.accountFollow.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false, as: "followUserEmail", primaryKey: true } });


db.accountFollow.removeAttribute('id')


// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");
  const current = new Date();
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ email: "test1", password_hash: hash, first_name: "test1", last_name : "test1", date_of_registration: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}` });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "test2", password_hash: hash, first_name: "test2", last_name : "test2", date_of_registration: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`});
}



module.exports = db;
