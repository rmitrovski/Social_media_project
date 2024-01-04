module.exports = (sequelize, DataTypes) =>
  sequelize.define("postReaction", {

    reaction: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
  module.exports = (sequelize, DataTypes) =>
  sequelize.define("postReaction", {

    reaction: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });