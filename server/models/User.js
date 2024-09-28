module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("player", "coach", "scout", "playerRecruiter"),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
    User.belongsToMany(models.Event, { through: "UserEvents" });
    User.belongsToMany(models.Tournament, { through: "UserTournaments" });
    User.hasMany(models.Message, {
      as: "sentMessages",
      foreignKey: "senderId",
    });
    User.hasMany(models.Message, {
      as: "receivedMessages",
      foreignKey: "recipientId",
    });
  };

  return User;
};
