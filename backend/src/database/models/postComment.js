module.exports = (sequelize, DataTypes) =>
  sequelize.define("postComment", {

    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: true
  });
