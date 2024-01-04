module.exports = (sequelize, DataTypes) =>
  sequelize.define("accountFollow", {
    followedEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
